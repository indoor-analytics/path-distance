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


    it ('should return vectors with a 0-distance while comparing a path with itself', () => {
        const vectors = pathDistance(path1, path1);

        for (const vector of vectors) {
            expect(vector.distance).to.equal(0);
            expect(vector.acquiredPoint).to.deep.equal(vector.projectedPoint);
        }
    });

    it ('should return first vector mapped on first path position', () => {
        const vectors = pathDistance(path1, path2);
        const firstVector = vectors[0];
        expect(firstVector.projectedDistance).to.equal(0);
        expect(firstVector.projectedPoint).to.deep.equal(path1.geometry!.coordinates[0]);
    });
});
