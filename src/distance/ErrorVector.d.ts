/**
 * Stolen from https://gitlab.inria.fr/indoor-analytics/path-error-analysis/entities/
 * TODO use @indoor-analytics/entities package
 *
 * Contains all information defining an error about a location while analysing a path.
 * It represents distance between:
 *     * a location acquired by an indoor positioning system;
 *     * a position on the reference path which the previous location would equal, if the IPS was perfect.
 */
export default class ErrorVector {
    index: number;
    distance: number;
    projectedDistance: number;
    acquiredPoint: number[];
    projectedPoint: number[];
    constructor(index: number, acquiredPoint: number[], projectedPoint: number[], distance: number, projectedDistance: number);
    static fromAPI(raw: any): ErrorVector;
}
