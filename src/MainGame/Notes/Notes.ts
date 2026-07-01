import { Container } from "pixi.js";
import DefaultNoteGraphics from "./DefaultNoteGraphics";

export default class Notes extends Container {
    public looks: Container;
    public speed: number = 1.0;
    public length: number = 1.0;

    constructor(looks?: Container) {
        super();

        this.looks = looks ?? DefaultNoteGraphics.default();
        this.addChild(this.looks);
    }
}
