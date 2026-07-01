import { Graphics } from "pixi.js";
import GameBar from "../GameBar/GameBar";

export default class DefaultJudgementBarGraphics extends Graphics {
    public static screenWidth = 0;

    constructor() {
        super();
        this.rect(0, 0, DefaultJudgementBarGraphics.screenWidth, 5);
        this.fill(0xff0000);
        this.position.y = (GameBar.height * 5) / 6;
    }
}
