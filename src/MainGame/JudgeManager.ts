import Judgement from "./Judgement";

class JudgementData {
    public worth: number;
    public score: number;
    constructor(worth: number, score: number) {
        this.worth = worth;
        this.score = score;
    }
}

export default class JudgeManager {

    public readonly inputError = 10;

    constructor(perfect: number, good: number, bad: number) {
        this.perfect = perfect;
        this.good = good;
        this.bad = bad;

        this.table.set("perfect", new JudgementData(4, 100));
        this.table.set("good", new JudgementData(3, 80));
        this.table.set("bad", new JudgementData(2, 50));
        this.table.set("miss", new JudgementData(1, 0));
    }

    private perfect: number = 20;
    private good: number = 50;
    private bad: number = 100;

    private table: Map<Judgement, JudgementData> = new Map();

    public judge(noteY: number, judgeY: number): Judgement {
        const base = Math.abs(noteY - judgeY + this.inputError);
        if (base <= this.perfect) {
            return "perfect";
        } else if (base <= this.good) {
            return "good";
        } else if (base <= this.bad) {
            return "bad";
        }
        return "miss";
    }

    public compare(a: Judgement, b: Judgement): Judgement {
        const a_n = this.table.get(a);
        const b_n = this.table.get(b);
        if (a_n && b_n)
            if (a_n > b_n) {
                return a;
            } else {
                return b;
            }
        else console.log("Error judgement が比べられない");
        return "miss";
    }

    public getScore(judgement: Judgement): number {
        const score = this.table.get(judgement);
        if (score) {
            return score.score;
        } else {
            return 0;
        }
    }
}
