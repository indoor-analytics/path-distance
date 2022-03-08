import {distanceWithTime} from "../src/distanceWithTime";
import {
    checkpointsTimestamps,
    getRailwayReference,
    getReversedRailwayReference, getReversedTimedRun,
    getTimedRun,
    path1,
    path2
} from "./test.features";
import {expect} from "chai";
import {clone} from "@turf/turf";

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

    it('should get distance from a run with a segment length equaling 0', () => {
        const ref = getReversedRailwayReference();
        const runWithTimestamps = getReversedTimedRun();
        const refTimestamps = [
            1626160464589,
            1626160475768,
            1626160484477,
            1626160489562,
            1626160498654,
            1626160516357,
            1626160524949,
            1626160532186,
            1626160544954,
            1626160561541,
            1626160566997,
            1626160578144
        ];
        const vectors = distanceWithTime(ref, runWithTimestamps, refTimestamps);
        expect(vectors.length).not.to.equal(0);
    })
});
