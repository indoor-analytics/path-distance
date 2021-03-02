import {Feature, LineString} from "@turf/helpers";
import ErrorVector from "./ErrorVector";
import {lineDistance} from "@turf/turf";

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

