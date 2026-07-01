import { NotesData } from "../ChartData";

export default interface IChartLoader {
    load(path: string): Promise<NotesData[]>;
}
