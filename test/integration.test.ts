import {
    getCheckpointsWithDoubleSecondTime,
    getRailwayReferenceWithDoubleStartingPoint,
    getTimedRun,
    path1,
    path2
} from "./test.features";
import {lineString} from "@turf/helpers";
import { expect } from "chai";
import * as imported from "@indoor-analytics/path-distance";
import {pathDistance} from "../main";

describe ('Integration test', () => {
    it ('should be able to use exposed method', () => {
        const vectors = pathDistance(path1, path2);
        const vectorsLines = vectors.map((vector) =>
            lineString([vector.projectedPoint, vector.acquiredPoint], {"stroke": "#ff0000"}));
        expect(vectorsLines.length).to.equal(path2.geometry!.coordinates.length);
    });

    it ('should be able to use exposed method from NPM package', () => {
        const vectors = imported.pathDistance(path1, path2);
        const vectorsLines = vectors.map((vector) =>
            lineString([vector.projectedPoint, vector.acquiredPoint], {"stroke": "#ff0000"}));
        expect(vectorsLines.length).to.equal(path2.geometry!.coordinates.length);
    });

    it('should behave differently regarding input settings', () => {
        const referencePath = getRailwayReferenceWithDoubleStartingPoint();
        const comparedPath = getTimedRun();

        const classicVectors = pathDistance(referencePath, comparedPath);
        const timedVectors = pathDistance(referencePath, comparedPath, getCheckpointsWithDoubleSecondTime());

        const classicVectorsAverage = classicVectors.map(e => e.distance).reduce((a, b) => a+b);
        const timedVectorsAverage = timedVectors.map(e => e.distance).reduce((a, b) => a+b);
        expect(classicVectorsAverage).to.be.greaterThan(timedVectorsAverage);
    })
});
