import { Container, Ticker } from "pixi.js";
import GameBar from "./GameBar/GameBar";
import DefaultJudgementBarGraphics from "./JudgementBar/DefaultJudgementBarGraphics";
import JudgementBar from "./JudgementBar/JudgementBar";
import JudgementEffect from "./Judgement/JudgementEffect";
import BadEffect from "./Judgement/Implementation/BadEffect";
import GoodEffect from "./Judgement/Implementation/GoodEffect";
import MisstakeEffect from "./Judgement/Implementation/MisstakeEffect";
import PerfectEffect from "./Judgement/Implementation/PerfectEffect";

export interface IGameScreenOption {
    bar: {
        length: number;
        width?: number;
        height?: number;
    };
}

export default class GameScreen extends Container {
    public static readonly gap: number = 10;

    public bars: GameBar[] = [];
    public judgementbar: JudgementBar;
    public judgementeffect: JudgementEffect;

    public get length() {
        return this.bars.length;
    }

    constructor(opt: IGameScreenOption) {
        super();
        GameBar.width = opt.bar.width ?? 70;
        GameBar.height = opt.bar.height ?? 600;
        DefaultJudgementBarGraphics.screenWidth =
            opt.bar.length * GameBar.width +
            (opt.bar.length - 1) * GameScreen.gap;
        for (let i = 0; i < opt.bar.length; i++) {
            const bar = new GameBar();
            bar.position.x = i * (GameBar.width + GameScreen.gap);
            this.bars.push(bar);
            this.addChild(bar);
        }
        this.judgementbar = new JudgementBar();
        this.judgementeffect = new JudgementEffect([
            new BadEffect(),
            new GoodEffect(),
            new MisstakeEffect(),
            new PerfectEffect(),
        ]);
        this.addChild(this.judgementbar, this.judgementeffect);
    }

    public tick(_t: Ticker) {
        this.bars.forEach((v) => v.tick(_t));
    }
}
