import Judgement from "./Judgement";

export default class JudgeManager {
    constructor(perfect: number, good: number, bad: number) {
        this.perfect = perfect;
        this.good = good;
        this.bad = bad;

        this.table.set("perfect", 4);
        this.table.set("good", 3);
        this.table.set("bad", 2);
        this.table.set("miss", 1);
    }

    private perfect: number = 20;
    private good: number = 50;
    private bad: number = 100;

    private table: Map<Judgement, number> = new Map();

    public judge(noteY: number, judgeY: number): Judgement {
        const base = Math.abs(noteY - judgeY);
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
}
