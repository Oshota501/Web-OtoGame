import { NotesData } from "../ChartData";
import IChartLoader from "./IChartLoader";

export default class RandomChartLoader implements IChartLoader {
    public length: number;
    public step: number;
    public half: number;
    public quarter: number;
    public triplet: number;

    constructor(
        length: number,
        step: number,
        half: number,
        quarter: number,
        triplet: number,
    ) {
        this.length = length;
        this.step = step;
        this.half = half;
        this.quarter = quarter;
        this.triplet = triplet;
    }
    public async load(): Promise<NotesData[]> {
        const result = [];
        for (let i = 1; i < this.length; i++) {
            result.push(
                new NotesData(i * this.step, Math.floor(Math.random() * 4)),
            );
        }
        for (let i = 0; i < this.half; i++) {
            result.push(
                new NotesData(
                    Math.floor(Math.random() * this.length) + this.step * 0.5,
                    Math.floor(Math.random() * 4),
                ),
            );
        }
        for (let i = 0; i < this.quarter; i++) {
            result.push(
                new NotesData(
                    Math.floor(Math.random() * this.length) +
                        this.step * (Math.random() >= 0.5 ? 0.25 : 0.75),
                    Math.floor(Math.random() * 4),
                ),
            );
        }
        for (let i = 0; i < this.triplet; i++) {
            result.push(
                new NotesData(
                    Math.floor(Math.random() * this.length) +
                        this.step * (Math.random() >= 0.5 ? 0.333 : 0.667),
                    Math.floor(Math.random() * 4),
                ),
            );
        }

        return result;
    }
}
