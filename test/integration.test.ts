import {pathDistance} from "../src/main";
import {path1, path2} from "./test.features";
import {lineString, FeatureCollection, featureCollection} from "@turf/helpers";
import { expect } from "chai";
import * as fs from "fs";

function printCollectionToFile (collection: FeatureCollection): void {
    fs.writeFileSync('node.json', JSON.stringify(collection));
}

// You can use http://geojson.io/ to visualize data exported in node.json
describe ('Integration test', () => {
    it ('should be able to use exposed method', () => {
        const vectors = pathDistance(path1, path2);
        const vectorsLines = vectors.map((vector) =>
            lineString([vector.projectedPoint, vector.acquiredPoint], {"stroke": "#ff0000"}));
        printCollectionToFile(featureCollection([path1, path2, ...vectorsLines]));
        expect(vectorsLines.length).to.equal(path2.geometry!.coordinates.length);
    });
});
