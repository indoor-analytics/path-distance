import {ErrorVector} from "@indoor-analytics/entities";
import {Feature, LineString} from "@turf/helpers";

/**
 * Compares a path to another by projecting its positions on the reference path.
 * This will also compare path locations reception times to checkpoints timestamps.
 *
 * @param referencePath ground truth path
 * @param comparedPath path to compare to ground truth
 * @param checkpointsTimestamps times (in milliseconds since Unix Epoch) when reference path checkpoints have been reached
 */
export function distanceWithTime (
    referencePath: Feature<LineString>,
    comparedPath: Feature<LineString>,
    checkpointsTimestamps: number[]
): ErrorVector[] {
    if (checkpointsTimestamps.length === 0)
        throw new RangeError('Timestamps array must not be empty.');
    if (checkpointsTimestamps.length !== referencePath.geometry?.coordinates.length)
        throw new RangeError('Timestamps array length must match reference path locations count.');

    return [];
}
