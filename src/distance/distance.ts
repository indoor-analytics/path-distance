import {Feature, LineString, Point} from "@turf/helpers";
import ErrorVector from "./ErrorVector";
import {distance, lineDistance} from "@turf/turf";

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
    return [];
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
        coveredDistance*1000
    );
}
