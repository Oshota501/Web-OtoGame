import { Container, Text } from "pixi.js";
import JudgementEffectFactory from "../JudgementEffectFactory";

export default class PerfectEffect extends JudgementEffectFactory {
    constructor() {
        super("perfect");
    }
    public override create(): Container {
        return new Text({
            text: "Perfect!",
            style: {
                fontFamily: "Arial",
                fontSize: 24,
                fill: 0x009999,
                align: "center",
            },
        });
    }
}
