import { Feature, LineString } from "@turf/helpers";
import { ErrorVector } from "@indoor-analytics/entities";
/**
 * Compares a path to a reference path by projecting its positions on the reference path.
 * More details about the algorithm in the readme.
 *
 * @param referencePath
 * @param comparedPath
 */
export declare function classicPathDistance(referencePath: Feature<LineString>, comparedPath: Feature<LineString>): ErrorVector[];
