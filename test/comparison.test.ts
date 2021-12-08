import { pathDistance } from "@indoor-analytics/path-distance";
import { expect } from "chai";
import { distanceWithTime } from "../src/distanceWithTime";
import {
    getTimedRun,
    getRailwayReferenceWithDoubleStartingPoint, getCheckpointsWithDoubleSecondTime, path1, path2
} from "./test.features";
import {FeatureCollection, featureCollection, lineString} from "@turf/helpers";
import fs from "fs";

function printCollectionToFile (collection: FeatureCollection, filename = 'node'): void {
    fs.writeFileSync(`${filename}.json`, JSON.stringify(collection));
}

// You can use http://geojson.io/ to visualize data exported in node.json
it ('should be more accurate than pathDistance method with run having many locations at the beginning of reference path', () => {
    const referencePath = getRailwayReferenceWithDoubleStartingPoint();
    const comparedPath = getTimedRun();

    const classicVectors = pathDistance(referencePath, comparedPath);
    let total = 0;
    classicVectors.forEach(v => total += v.distance);
    const classicVectorsAverageError = total/classicVectors.length;

    total = 0;
    const timeVectors = distanceWithTime(referencePath, comparedPath, getCheckpointsWithDoubleSecondTime());
    timeVectors.forEach(v => total += v.distance);
    const timeVectorsAverageError = total/timeVectors.length;

    expect(timeVectorsAverageError).to.be.below(classicVectorsAverageError);
    console.log('classic distance:', classicVectorsAverageError);
    console.log('timed distance:', timeVectorsAverageError);

    const timeVectorsLines = timeVectors.map((vector) =>
        lineString([vector.projectedPoint, vector.acquiredPoint], {"stroke": "#ff0000"}));
    printCollectionToFile(featureCollection([referencePath, comparedPath, ...timeVectorsLines]), 'timeVectors');
    const classicVectorsLines = classicVectors.map((vector) =>
        lineString([vector.projectedPoint, vector.acquiredPoint], {"stroke": "#ff0000"}));
    printCollectionToFile(featureCollection([referencePath, comparedPath, ...classicVectorsLines]), 'classicVectors');
});

it ('should return same vectors count', () => {
    const referencePath = getRailwayReferenceWithDoubleStartingPoint();
    const comparedPath = getTimedRun();

    const classicVectors = pathDistance(referencePath, comparedPath);
    const timeVectors = distanceWithTime(referencePath, comparedPath, getCheckpointsWithDoubleSecondTime());

    expect(classicVectors.length).to.equal(timeVectors.length);
});
