import { Container, Text } from "pixi.js";
import JudgementEffectFactory from "../JudgementEffectFactory";

export default class MisstakeEffect extends JudgementEffectFactory {
    constructor() {
        super("miss");
    }
    public override create(): Container {
        return new Text({
            text: 'Miss',
            style: {
                fontFamily: 'Arial',
                fontSize: 24,
                fill: 0xff0000,
                align: 'center',
            },
        })
    }
}
