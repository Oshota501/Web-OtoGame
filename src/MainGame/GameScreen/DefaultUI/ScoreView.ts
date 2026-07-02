import { Text } from "pixi.js";

export default class ScoreView extends Text {
    public setScore(score: number, percent: number) {
        this.text = `Score: ${score} \n${percent} %`;
    }
    constructor() {
        super({
            text: "Score: 0 \n0.00 %",
            style: {
                fontFamily: "Arial",
                fontSize: 40,
                fill: 0x00ff00,
                align: "center",
            },
        });
    }
}
