import { Container, Ticker } from "pixi.js";
import DefaultGameBarGraphics from "./DefaultGameBarGraphics";
import { GameBarEffect } from "./GameBarEffect";

export default class GameBar extends Container {
    public static width: number = 70;
    public static height: number = 600;

    public looks: Container;

    public effect = new GameBarEffect();

    constructor(looks?: Container) {
        super();
        this.looks = looks ?? new DefaultGameBarGraphics();
        this.addChild(this.looks);
        this.filters = [this.effect];
    }

    public tick(_t: Ticker) {
        this.effect.tick(_t);
    }
}
