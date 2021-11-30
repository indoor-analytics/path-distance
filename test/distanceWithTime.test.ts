import {distanceWithTime} from "../src/distanceWithTime";
import {path1, path2} from "./test.features";
import {expect} from "chai";

describe('distanceWithTime', () => {
    it ('should throw with empty timestamps array', () => {
        const getDistance = () => distanceWithTime(path1, path2, []);
        expect(getDistance).to.throw(RangeError, 'Timestamps array must not be empty.');
    });
});
