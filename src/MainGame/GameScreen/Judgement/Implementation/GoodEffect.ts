import { Container, Text } from "pixi.js";
import JudgementEffectFactory from "../JudgementEffectFactory";

export default class GoodEffect extends JudgementEffectFactory {
    constructor() {
        super("good");
    }
    public override create(): Container {
        return new Text({
            text: "Good",
            style: {
                fontFamily: "Arial",
                fontSize: 24,
                fill: 0x00ffff,
                align: "center",
            },
        });
    }
}
