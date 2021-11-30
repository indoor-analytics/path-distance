import {distanceWithTime} from "../src/distanceWithTime";
import {checkpointsTimestamps, getRailwayReference, path1, path2} from "./test.features";
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
});
