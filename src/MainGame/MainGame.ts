import { Ticker } from "pixi.js";
import GameScreen from "./GameScreen/GameScreen";
import EventAdder from "./InputEventListener/EventAdder";
import NoteFactory from "./Notes/NotesFactory";
import GameBar from "./GameScreen/GameBar/GameBar";
import Notes from "./Notes/Notes";
import Judgement from "./Judgement";
import JudgeManager from "./JudgeManager";

export default class MainGame {
    public screen: GameScreen;

    private length: number;

    constructor(length: number) {
        this.screen = new GameScreen({
            bar: {
                length: length,
            },
        });

        this.length = length;
        for (let bar = 0; bar < length; bar++) {
            this.notes.push(new Set());
        }

        new EventAdder(this);
    }

    private notes: Set<Notes>[] = [];

    public spownNote(f: NoteFactory, bar: number) {
        const note = f.create();
        if (bar >= this.length || bar < 0) {
            console.log(`${bar} is out of range`);
            return;
        }
        note.position.set(GameBar.width * bar + bar * GameScreen.gap, 0);

        note.speed = ((GameBar.height * 5) / 6) * note.speed;

        this.notes[bar].add(note);

        this.screen.addChild(note);
    }

    public tick(_t: Ticker) {
        this.screen.tick(_t);

        for (let bar = 0; bar < this.length; bar++) {
            this.notes[bar].forEach((v) => {
                v.position.y += v.speed * _t.deltaMS * 0.001;
                if (v.position.y >= GameBar.height) {
                    this.screen.judgementeffect.add(
                        "miss",
                        v.x,
                        v.y + 30,
                        1000,
                    );
                    this.notes[bar].delete(v);
                    this.screen.removeChild(v);
                }
            });
        }
    }

    public judge(bar: number): Judgement {
        let judgement: Judgement = "miss";
        let notes: Notes | undefined;
        this.notes[bar].forEach((v) => {
            if ((GameBar.height * 5) / 6 - v.y >= GameBar.height * 0.35) {
                return;
            }
            const now = this.judgeManager.judge(v.y, (GameBar.height * 5) / 6);
            const p = this.judgeManager.compare(judgement, now);
            if (p == now) {
                notes = v;
                judgement = now;
            }
        });

        if (notes != undefined) {
            this.screen.judgementeffect.add(
                judgement,
                notes.x,
                notes.y + 30,
                1000,
            );
            this.notes[bar].delete(notes);
            this.screen.removeChild(notes);
        }
        return judgement;
    }

    private judgeManager = new JudgeManager(20, 50, 100);
}
