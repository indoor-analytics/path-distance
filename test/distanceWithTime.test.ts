import {distanceWithTime} from "../src/distanceWithTime";
import {path1, path2} from "./test.features";
import {expect} from "chai";

describe('distanceWithTime', () => {
    it ('should throw with empty timestamps array', () => {
        const getDistance = () => distanceWithTime(path1, path2, []);
        expect(getDistance).to.throw(RangeError, 'Timestamps array must not be empty.');
    });

    it ('should throw if timestamps array length does not match checkpoints length', () => {
        const getDistance = () => distanceWithTime(path1, path2, [1638266548305, 1638266554087, 1638266564618, 1638266571176]);
        expect(getDistance).to.throw(RangeError, 'Timestamps array length must match reference path locations count.');
    });
});
