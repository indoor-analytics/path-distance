import { ErrorVector } from "@indoor-analytics/entities";
import { Feature, LineString } from "@turf/helpers";
declare function pathDistance(referencePath: Feature<LineString>, comparedPath: Feature<LineString>, checkpointsTimestamps?: number[]): ErrorVector[];
export { pathDistance };
