import {distanceWithTime} from "../src/distanceWithTime";
import {checkpointsTimestamps, getRailwayReference, getTimedRun, path1, path2} from "./test.features";
import {expect} from "chai";
import {clone} from "@turf/turf";
import { pathDistance } from "@indoor-analytics/path-distance";
import { ErrorVector } from "@indoor-analytics/entities";

describe('distanceWithTime', () => {
    it ('should throw with empty timestamps array', () => {
        const getDistance = () => distanceWithTime(path1, path2, []);
        expect(getDistance).to.throw(RangeError, 'Timestamps array must not be empty.');
    });

    it ('should throw if timestamps array length does not match checkpoints length', () => {
        const getDistance = () => distanceWithTime(path1, path2, [1638266548305, 1638266554087, 1638266564618, 1638266571176]);
        expect(getDistance).to.throw(RangeError, 'Timestamps array length must match reference path locations count.');
    });

    it ('should throw if compared path has not as many timestamps as locations', () => {
        const faultyPath = clone(path2);
        faultyPath.properties!.locationsTimestamps = [0, 1, 2, 3];
        const getDistance = () => distanceWithTime(getRailwayReference(), faultyPath, checkpointsTimestamps);
        expect(getDistance).to.throw(RangeError, 'Compared path timestamps length must match its locations count.');
    });

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

        expect(timeVectorsAverageError).to.be.greaterThan(classicVectorsAverageError);
    });
});
