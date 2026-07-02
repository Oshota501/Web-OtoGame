import JudgeManager from "../JudgeManager";
import Judgement from "../Judgement";

export default class ScoreManager {
    private judgeManager: JudgeManager;

    private _score: number = 0;

    private _percent: number = 0;

    private n: number = 0;

    public add(judgement: Judgement) {
        const score = this.judgeManager.getScore(judgement);
        this._score += score;
        this.n++;
        this._percent = this._score / this.n;
        this.changeListenerFuncs.forEach(element => {
            element(this._score, this._percent);
        });
    }

    public reset() {
        this._score = 0;
        this.n = 0;
        this._percent = 0;
        this.changeListenerFuncs.forEach(element => {
            element(this._score, this._percent);
        });
    }

    private changeListenerFuncs: Set<((score: number, percent: number) => void)> = new Set();

    public addListener(func: (score: number, percent: number) => void) {
        this.changeListenerFuncs.add(func);
    }
    public removeListener(func: (score: number, percent: number) => void) {
        this.changeListenerFuncs.delete(func);
    }

    public get score() {
        return this._score;
    }
    public get per() {
        return this._percent;
    }

    constructor(judgeManager: JudgeManager, eventFunc?: (score: number, percent: number) => void) {
        this.judgeManager = judgeManager;
        this.reset();
        if (eventFunc) {
            this.addListener(eventFunc);
        }
    }
}