import { Container } from "pixi.js";
import DefaultJudgementBarGraphics from "./DefaultJudgementBarGraphics";

export default class JudgementBar extends Container {
    public looks: Container;
    constructor(looks?: Container) {
        super();
        this.looks = looks ?? new DefaultJudgementBarGraphics();
        this.addChild(this.looks);
    }
}
