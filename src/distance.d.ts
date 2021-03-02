import { Feature, LineString } from "@turf/helpers";
import ErrorVector from "./ErrorVector";
/**
 * Compares a path to a reference path by projecting its positions on the reference path.
 * More details about the algorithm in the readme.
 *
 * @param referencePath
 * @param comparedPath
 */
export declare function pathDistance(referencePath: Feature<LineString>, comparedPath: Feature<LineString>): ErrorVector[];
