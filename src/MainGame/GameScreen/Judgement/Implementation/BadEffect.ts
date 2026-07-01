import { Container, Text } from "pixi.js";
import JudgementEffectFactory from "../JudgementEffectFactory";

export default class BadEffect extends JudgementEffectFactory {
    constructor() {
        super("bad");
    }
    public override create(): Container {
        return new Text({
            text: "Bad",
            style: {
                fontFamily: "Arial",
                fontSize: 24,
                fill: 0xff9900,
                align: "center",
            },
        });
    }
}
