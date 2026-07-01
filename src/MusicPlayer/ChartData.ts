import { Howl } from "howler";

export class NotesData {
    public timing: number;
    public bar: number;
    public speed: number;
    constructor(timing: number, bar: number, speed?: number) {
        this.timing = timing;
        this.bar = bar;
        this.speed = speed ?? 1;
    }
}

export default class ChartData {
    public sound: Howl;
    public notes: NotesData[];
    constructor(sound: Howl, notes_data: NotesData[]) {
        this.sound = sound;
        this.notes = notes_data;
    }
}
