import { Graphics } from "pixi.js";
import GameBar from "../GameScreen/GameBar/GameBar";

export default class DefaultNoteGraphics extends Graphics {
    constructor(width: number, height: number) {
        super();
        this.rect(0, 0, width, height);
        this.fill(0x000000);
    }

    public static default() {
        const graphics = new DefaultNoteGraphics(
            GameBar.width,
            GameBar.width / 10,
        );
        return graphics;
    }
}
