import { Feature, LineString } from "@turf/helpers";
import ErrorVector from "./ErrorVector";
export declare function pathDistance(path1: Feature<LineString>, path2: Feature<LineString>): ErrorVector[];
