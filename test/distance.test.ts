import { expect } from "chai";
import {path1, path2} from "./test.features";
import {pathDistance} from "../src/distance/distance";

describe ('distance', () => {
    it ('should return some vectors', () => {
        const vectors = pathDistance(path1, path2);
        expect(vectors.length).to.not.equal(0);
    });
});
