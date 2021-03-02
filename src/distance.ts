import {Feature, LineString, Point, point} from "@turf/helpers";
import ErrorVector from "./ErrorVector";
import {along, distance, lineDistance} from "@turf/turf";

/**
 * Compares a path to a reference path by projecting its positions on the reference path.
 * More details about the algorithm in the readme.
 *
 * @param referencePath
 * @param comparedPath
 */
export function pathDistance (
    referencePath: Feature<LineString>,
    comparedPath: Feature<LineString>
): ErrorVector[] {

    const vectors: ErrorVector[] = [];
    let index = 0;
    const delta = getLineDistanceDelta(referencePath, comparedPath);
    const acquiredCoordinates = comparedPath.geometry!.coordinates;

    // origin
    const startPoint = acquiredCoordinates[0];
    const projectedStartPoint = referencePath.geometry!.coordinates[0];
    vectors.push(
        createVectorFrom(point(startPoint), point(projectedStartPoint), index, 0)
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
            createVectorFrom(point(currentPoint), newPoint, i, interpolationDistance)
        );
    }

    // last one
    const endPoint = acquiredCoordinates[acquiredCoordinates.length-1];
    const projectedEndPoint = referencePath.geometry!.coordinates[referencePath.geometry!.coordinates.length-1];
    vectors.push(
        createVectorFrom(point(endPoint), point(projectedEndPoint), length, lineDistance(referencePath, {units: 'meters'}))
    );

    return vectors;
}


/**
 * Returns distance delta between two paths.
 *
 * @param referencePath
 * @param acquiredPath
 */
function getLineDistanceDelta (
    referencePath: Feature<LineString>,
    acquiredPath: Feature<LineString>
): number {
    return lineDistance(referencePath) / lineDistance(acquiredPath);
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
