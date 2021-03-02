import { Feature, LineString } from "@turf/helpers";
import ErrorVector from "./ErrorVector";
export declare function distance(path1: Feature<LineString>, path2: Feature<LineString>): ErrorVector[];
