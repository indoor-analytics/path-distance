import {ErrorVector} from "@indoor-analytics/entities";
import {Feature, lineString, LineString} from "@turf/helpers";
import {Position} from "@turf/turf";
import {classicPathDistance} from "./classicDistance";

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
    comparedPath: Feature<LineString, {locationsTimestamps: number[]}>,
    checkpointsTimestamps: number[]
): ErrorVector[] {
    if (checkpointsTimestamps.length === 0)
        throw new RangeError('Timestamps array must not be empty.');
    if (checkpointsTimestamps.length !== referencePath.geometry?.coordinates.length)
        throw new RangeError('Timestamps array length must match reference path locations count.');
    if (comparedPath.properties?.locationsTimestamps.length !== comparedPath.geometry?.coordinates.length)
        throw new RangeError('Compared path timestamps length must match its locations count.');

    const vectors: ErrorVector[] = [];

    for (let i=0; i<referencePath.geometry.coordinates.length-1; i++) {
        const start: Position = referencePath.geometry.coordinates[i];
        const startTime = checkpointsTimestamps[i];
        const end: Position = referencePath.geometry.coordinates[i+1];
        const endTime = checkpointsTimestamps[i+1];

        const referencePathSegment = lineString([start, end]);

        const comparedPathSegmentCoordinates = comparedPath.geometry!.coordinates.filter((pos, index) => {
            const posTime = comparedPath.properties!.locationsTimestamps[index];
            return startTime <= posTime && posTime <= endTime;
        });
        if (comparedPathSegmentCoordinates.length <= 1) continue;
        const comparedPathSegment = lineString(comparedPathSegmentCoordinates);

        vectors.push(...classicPathDistance(referencePathSegment, comparedPathSegment));
    }

    return vectors;
}
