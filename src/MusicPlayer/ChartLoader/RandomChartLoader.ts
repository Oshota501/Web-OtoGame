import { NotesData } from "../ChartData";
import IChartLoader from "./IChartLoader";

export default class RandomChartLoader implements IChartLoader {
    public length: number;
    public step: number;
    public half: number;
    constructor(length: number, step: number, half: number) {
        this.length = length;
        this.step = step;
        this.half = half;
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
        return result;
    }
}
