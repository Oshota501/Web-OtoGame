import { Ticker } from "pixi.js";
import GameScreen from "./GameScreen/GameScreen";
import EventAdder from "./InputEventListener/EventAdder";
import NoteFactory from "./GameEvent/Notes/NotesFactory";
import GameBar from "./GameScreen/GameBar/GameBar";
import Notes from "./GameEvent/Notes/Notes";
import Judgement from "./Judgement";
import JudgeManager from "./JudgeManager";
import ScoreManager from "./ScoreManager/ScoreManager";

export default class MainGame {
    public screen: GameScreen;

    public scoreManager: ScoreManager;

    private length: number;

    constructor(length: number) {
        this.screen = new GameScreen({
            bar: {
                length: length,
            },
            score: {
                position: {
                    x: 450,
                    y: 120,
                },
            },
        });

        this.length = length;
        for (let bar = 0; bar < length; bar++) {
            this.notes.push(new Set());
        }
        this.scoreManager = new ScoreManager(
            this.judgeManager,
            (score, percent) => {
                this.screen.scoreView.setScore(score, percent);
            },
        );
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
                    this.scoreManager.add("miss");
                }
            });
        }
    }

    private barHeight = (GameBar.height * 5) / 6;

    public judge(bar: number): Judgement {
        let judgement: Judgement = "miss";
        let notes: Notes | undefined;
        this.notes[bar].forEach((v) => {
            if (this.barHeight - v.y >= GameBar.height * 0.15) {
                return;
            }
            const now = this.judgeManager.judge(v.y, this.barHeight);
            const p = this.judgeManager.compare(judgement, now);
            if (p == now) {
                notes = v;
                judgement = now;
            } else {
                if (
                    notes != undefined &&
                    Math.abs(this.barHeight - v.y) <
                        Math.abs(this.barHeight - notes.y)
                ) {
                    notes = v;
                }
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
        this.scoreManager.add(judgement);
        return judgement;
    }

    private judgeManager = new JudgeManager(16, 40, 70);
}
