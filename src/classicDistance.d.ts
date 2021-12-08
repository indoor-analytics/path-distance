import { Feature, LineString } from "@turf/helpers";
import { ErrorVector } from "@indoor-analytics/entities";
/**
 * Compares a path to a reference path by projecting its positions on the reference path.
 * More details about the algorithm in the readme.
 *
 * @param referencePath
 * @param comparedPath
 * @param basisReferencePathLength length to add to current reference path length (used by time algorithm)
 */
export declare function classicPathDistance(referencePath: Feature<LineString>, comparedPath: Feature<LineString>, basisReferencePathLength?: number): ErrorVector[];
