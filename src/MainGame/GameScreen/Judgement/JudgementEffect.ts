import { Container } from "pixi.js";
import Judgement from "../../Judgement";
import JudgementEffectFactory from "./JudgementEffectFactory";
import MisstakeEffect from "./Implementation/MisstakeEffect";

export default class JudgementEffect extends Container {
    public effect: Map<Judgement, JudgementEffectFactory> = new Map();

    constructor(f: JudgementEffectFactory[]) {
        super();

        f.forEach((element) => {
            this.effect.set(element.judge, element);
        });
    }

    public add(j: Judgement, x: number, y: number, time: number) {
        const t = this.effect.get(j) ?? new MisstakeEffect();
        const e = t.create();
        e.position.set(x, y);
        this.addChild(e);
        setTimeout(() => {
            this.removeChild(e);
        }, time);
    }
}
