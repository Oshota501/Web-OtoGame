import { Ticker } from "pixi.js";
import MainGame from "../MainGame/MainGame";
import ChartData from "./ChartData";
import NoteFactory from "../MainGame/Notes/NotesFactory";
import Notes from "../MainGame/Notes/Notes";

export default class MusicPlayer {
    public game: MainGame;

    constructor(game: MainGame) {
        this.game = game;
    }

    private data: ChartData | undefined;
    private nowTime: number = 0;
    private isStart: boolean = false;
    private noteindex = 0;
    private factory = new (class _NoteFactory extends NoteFactory {
        public speed: number = 1;
        public override create(): Notes {
            const notes = new Notes();
            notes.speed = this.speed;
            return notes;
        }
    });

    public play(data: ChartData) {
        if (!this.isStart) {
            this.noteindex = 0;
            data.notes.sort((a, b) => { return (a.timing - a.speed) - (b.timing - b.speed) });
            data.sound.on("end", () => {
                this.isStart = false;
            });
            data.sound.stop();
            this.isStart = true;
            this.nowTime = 0;
            this.data = data;
            data.sound.play();
        }
    }
    public stop() {
        this.isStart = false;
        this.data?.sound.pause();
    }

    public tick(_t: Ticker) {
        if (this.isStart && this.data) {
            this.nowTime += _t.deltaMS * 0.001;
            while (true) {
                if (this.noteindex >= this.data.notes.length) {
                    console.log("finish");
                    break;
                }
                const notes = this.data.notes[this.noteindex];
                if (notes.timing - notes.speed <= this.nowTime) {
                    this.factory.speed = notes.speed;
                    this.game.spownNote(this.factory, notes.bar);
                    this.noteindex++;
                } else {
                    break;
                }
            }
        }
    }
}

