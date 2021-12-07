import { ErrorVector } from "@indoor-analytics/entities";
import { Feature, LineString } from "@turf/helpers";
/**
 * Compares a path to another by projecting its positions on the reference path.
 *
 * This encapsulates two different algorithms:
 *     - a classical algorithm only compares paths locations;
 *     - a timed algorithm also compares path locations reception times to checkpoints timestamps.
 *
 * To trigger the timed algorithm, you should provide an array of checkpoints timestamps (representing times when reference
 * path checkpoints have been reached) as third argument of this method, and the comparedPath LineString object should
 * feature a locationsTimestamps attribute (containing compared path locations acquisition timestamps).
 *
 *
 * @param referencePath ground truth path
 * @param comparedPath path to compare to ground truth
 * @param checkpointsTimestamps times (in milliseconds since Unix Epoch) when reference path checkpoints have been reached
 */
declare function pathDistance(referencePath: Feature<LineString>, comparedPath: Feature<LineString>, checkpointsTimestamps?: number[]): ErrorVector[];
export { pathDistance };
