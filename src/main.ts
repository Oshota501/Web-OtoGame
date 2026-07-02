import { Application } from "pixi.js";
// import AssetsLoader from "./MainGame/AssetLoader/AssetLoader";
import MainGame from "./MainGame/MainGame";
import MusicPlayer from "./MusicPlayer/MusicPlayer";
import ChartData from "./MusicPlayer/ChartData";
import { Howl } from "howler";
import RandomChartLoader from "./MusicPlayer/ChartLoader/RandomChartLoader";
import IChartLoader from "./MusicPlayer/ChartLoader/IChartLoader";

window.onload = async () => {
    // Create a new application
    const app = new Application();
    await app.init({ background: "#1099bb", resizeTo: window });

    document.getElementById("pixi-container")!.appendChild(app.canvas);

    // const assets = AssetsLoader.New();

    const game = new MainGame(4);

    const player = new MusicPlayer(game);

    const chartLoader: IChartLoader = new RandomChartLoader(76, 0.5, 25);

    const charts = new ChartData(
        new Howl({
            src: ["assets/monk.mp3"], // 配列で複数指定すると、ブラウザが対応する形式を自動選択
            volume: 0.5, // 音量 (0.0 ～ 1.0)
            loop: false, // ループ再生の有無
            preload: true, // 事前読み込み
        }),
        await chartLoader.load("assets/monk.wogmap"),
    );

    document.addEventListener("click", () => {
        player.play(charts);
    });

    app.stage.addChild(game.screen);

    // Listen for animate update
    app.ticker.add((t) => {
        game.tick(t);
        player.tick(t);
    });
};
