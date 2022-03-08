import {Feature, LineString, Point, point} from "@turf/helpers";
import {along, distance, lineDistance} from "@turf/turf";
import {ErrorVector} from "@indoor-analytics/entities";

/**
 * Compares a path to a reference path by projecting its positions on the reference path.
 * More details about the algorithm in the readme.
 *
 * @param referencePath
 * @param comparedPath
 * @param basisReferencePathLength length to add to current reference path length (used by time algorithm)
 */
export function classicPathDistance (
    referencePath: Feature<LineString>,
    comparedPath: Feature<LineString>,
    basisReferencePathLength: number = 0
): ErrorVector[] {

    const vectors: ErrorVector[] = [];
    let index = 0;
    const delta = getLineDistanceDelta(referencePath, comparedPath);
    const acquiredCoordinates = comparedPath.geometry!.coordinates;

    // origin
    const startPoint = acquiredCoordinates[0];
    const projectedStartPoint = referencePath.geometry!.coordinates[0];
    vectors.push(
        createVectorFrom(point(startPoint), point(projectedStartPoint), index, basisReferencePathLength)
    );

    let coveredDistance: number = 0;
    const length = acquiredCoordinates.length-1;
    // run over all coordinates until last one
    for (let i=1, len=length; i<len; i++) {
        const currentPoint = acquiredCoordinates[i] as any;
        const previousPoint = acquiredCoordinates[i-1] as any;

        // adding distance
        coveredDistance += distance( currentPoint, previousPoint, {units: 'meters'} );

        // projection of the point on the reference path
        const interpolationDistance = coveredDistance*delta;
        const newPoint = along(referencePath, interpolationDistance, {units: 'meters'});
        vectors.push(
            createVectorFrom(point(currentPoint), newPoint, i, interpolationDistance + basisReferencePathLength)
        );
    }

    // last one
    const endPoint = acquiredCoordinates[acquiredCoordinates.length-1];
    const projectedEndPoint = referencePath.geometry!.coordinates[referencePath.geometry!.coordinates.length-1];
    vectors.push(
        createVectorFrom(point(endPoint),
            point(projectedEndPoint),
            length,
            lineDistance(referencePath, {units: 'meters'}) + basisReferencePathLength
        )
    );

    return vectors;
}


/**
 * Returns distance delta between two paths.
 * If acquired path length equals 0, it returns 0.
 *
 * @param referencePath
 * @param acquiredPath
 */
function getLineDistanceDelta (
    referencePath: Feature<LineString>,
    acquiredPath: Feature<LineString>
): number {
    const refDistance = lineDistance(referencePath);
    const acqDistance = lineDistance(acquiredPath);
    return acqDistance === 0
        ? 0
        : refDistance / acqDistance;
}


/**
 * Computes the distance between an acquired position and its projection, and creates an error vector from it.
 *
 * @param pos1 acquired position
 * @param pos2 projected position
 * @param index place of the acquired point in its path
 * @param coveredDistance distance from the projected position to the origin of the reference path
 * @private
 */
function createVectorFrom (
    pos1: Feature<Point>,
    pos2: Feature<Point>,
    index: number,
    coveredDistance: number
): ErrorVector {
    return new ErrorVector(
        index,
        pos1.geometry!.coordinates,
        pos2.geometry!.coordinates,
        distance(pos1, pos2, {units: 'meters'}),
        coveredDistance
    );
}
