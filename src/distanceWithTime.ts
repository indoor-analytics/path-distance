import {ErrorVector} from "@indoor-analytics/entities";
import {Feature, LineString} from "@turf/helpers";

export function distanceWithTime (
    referencePath: Feature<LineString>,
    comparedPath: Feature<LineString>,
    checkpointsTimestamps: number[]
): ErrorVector[] {
    return [];
}
