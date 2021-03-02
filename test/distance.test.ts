import { expect } from "chai";
import {path1, path2} from "./test.features";
import {pathDistance} from "../src/distance/distance";

describe ('distance', () => {
    it ('should return some vectors', () => {
        const vectors = pathDistance(path1, path2);
        expect(vectors.length).to.not.equal(0);
    });

    it ('should return vectors in correct order', () => {
        const vectors = pathDistance(path1, path2);
        let index = 0;

        for (const vector of vectors) {
            expect(vector.index).to.equal(index);
            index += 1;
        }
    });
});
