import { pathDistance } from "@indoor-analytics/path-distance";
import { expect } from "chai";
import { distanceWithTime } from "../src/distanceWithTime";
import { getRailwayReference, getTimedRun, checkpointsTimestamps } from "./test.features";

it ('should be more accurate than pathDistance method with run having many locations at the beginning of reference path', () => {
    const referencePath = getRailwayReference();
    const comparedPath = getTimedRun();

    const classicVectors = pathDistance(referencePath, comparedPath);
    let total = 0;
    classicVectors.forEach(v => total += v.distance);
    const classicVectorsAverageError = total/classicVectors.length;

    total = 0;
    const timeVectors = distanceWithTime(referencePath, comparedPath, checkpointsTimestamps);
    timeVectors.forEach(v => total += v.distance);
    const timeVectorsAverageError = total/timeVectors.length;

    expect(timeVectorsAverageError).to.be.below(classicVectorsAverageError);
});