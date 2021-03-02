import { expect } from "chai";
import {path1, path2} from "./test.features";
import {pathDistance} from "../src/distance/distance";
import {lineString} from "@turf/helpers";

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

    it ('should throw with first path being empty', () => {
        expect(() => {
            pathDistance(lineString([]), path2);
        }).to.throw(Error, 'coordinates must be an array of two or more positions');
    });

    it ('should throw with second path being empty', () => {
        expect(() => {
            pathDistance(path2, lineString([]));
        }).to.throw(Error, 'coordinates must be an array of two or more positions');
    });

    it ('should throw with both paths having no coordinates', () => {
        expect(() => {
            pathDistance(lineString([]), lineString([]));
        }).to.throw(Error, 'coordinates must be an array of two or more positions');
    });
});
