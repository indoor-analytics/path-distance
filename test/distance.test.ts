import { expect } from "chai";
import {path1, path2} from "./test.features";
import {pathDistance} from "../src/distance/distance";
import {lineString} from "@turf/helpers";
import {lineDistance} from "@turf/turf";
import assert = require("assert");

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


    it ('should return first vector mapped on first path position', () => {
        const vectors = pathDistance(path1, path2);
        const firstVector = vectors[0];
        expect(firstVector.projectedDistance).to.equal(0);
        expect(firstVector.projectedPoint).to.deep.equal(path1.geometry!.coordinates[0]);
    });

    it ('should return last vector mapped on last path position', () => {
        const vectors = pathDistance(path1, path2);
        const lastVector = vectors[vectors.length-1];

        expect(lastVector.projectedDistance).to.be.approximately(lineDistance(path1), 0.000000000000001);
        expect(lastVector.projectedPoint).to.deep.equal(path1.geometry!.coordinates[path1.geometry!.coordinates.length-1]);
    });

    it ('should return vectors whose projectedDistance values increase', () => {
        const vectors = pathDistance(path1, path2);
        let distance = 0;

        for (const vector of vectors) {
            const currentDistance = vector.projectedDistance;
            if (currentDistance < distance)
                assert.fail("One vector's projected distance is inferior to previous vector's.");
            distance = currentDistance;
        }
    });


    it ('should return as many vectors as acquired path locations count (1)', () => {
        const vectors = pathDistance(path2, path1);
        expect(vectors.length).to.equal(path1.geometry!.coordinates.length);
    });

    it ('should return as many vectors as acquired path locations count (2)', () => {
        const vectors = pathDistance(path1, path2);
        expect(vectors.length).to.equal(path2.geometry!.coordinates.length);
    });
});
