import {classicPathDistance} from "./src/classicDistance";
import {ErrorVector} from "@indoor-analytics/entities";
import {Feature, LineString} from "@turf/helpers";
import {distanceWithTime} from "./src/distanceWithTime";

function pathDistance (
    referencePath: Feature<LineString>,
    comparedPath: Feature<LineString>,
    checkpointsTimestamps: number[] = []
): ErrorVector[] {
    return checkpointsTimestamps.length !== 0 && comparedPath.properties !== null && comparedPath.properties.hasOwnProperty('locationsTimestamps')
        ? distanceWithTime(referencePath, comparedPath as Feature<LineString, {locationsTimestamps: number[]}>, checkpointsTimestamps)
        : classicPathDistance(referencePath, comparedPath);
}

export {pathDistance};
