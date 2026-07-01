import { Graphics } from "pixi.js";
import GameBar from "./GameBar";

export default class DefaultGameBarGraphics extends Graphics {
    constructor() {
        super();

        this.rect(0, 0, GameBar.width, GameBar.height);
        this.fill(0xffffff);
    }
}
