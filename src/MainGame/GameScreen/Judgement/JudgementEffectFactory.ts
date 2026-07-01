import { Container } from "pixi.js";
import Judgement from "../../Judgement";

export default abstract class JudgementEffectFactory {
    public judge: Judgement;
    public abstract create(): Container;

    constructor(judge: Judgement) {
        this.judge = judge;
    }
}
