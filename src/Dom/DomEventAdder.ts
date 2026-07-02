import ChartData from "../MusicPlayer/ChartData";
import RandomChartLoader from "../MusicPlayer/ChartLoader/RandomChartLoader";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import { Howl } from "howler";

export default class DomEventAdder {
    // <button id="music-start">Start</button>
    // <input id="chart-setting-range" type="number">
    // <input id="chart-setting-number-of-half" type="number" value="30">
    // <input id="chart-setting-number-of-quanter" type="number" value="0">
    // <input id="chart-setting-number-of-triplet" type="number" value="0">

    public chartLoader: RandomChartLoader = new RandomChartLoader(
        80 * 2,
        0.5,
        30,
        0,
        0,
    );

    constructor(player: MusicPlayer) {
        const start_button = document.getElementById("music-start");
        if (start_button)
            start_button.addEventListener("click", () => {
                setInterval(async () => {
                    const charts = new ChartData(
                        new Howl({
                            src: ["assets/monk.mp3"], // 配列で複数指定すると、ブラウザが対応する形式を自動選択
                            volume: 0.5, // 音量 (0.0 ～ 1.0)
                            loop: false, // ループ再生の有無
                            preload: true, // 事前読み込み
                        }),
                        await this.chartLoader.load(/*"assets/monk.wogmap"*/),
                    );
                    player.play(charts);
                }, 3000);
            });
        const range = document.getElementById("chart-setting-range");
        if (range)
            range.addEventListener("input", () => {
                this.chartLoader.step = Number(
                    (range as HTMLInputElement).value,
                );
                if (this.chartLoader.step != 0)
                    this.chartLoader.length = 80 * (1 / this.chartLoader.step);
            });

        const half = document.getElementById("chart-setting-number-of-half");
        if (half)
            half.addEventListener("input", () => {
                this.chartLoader.half = Number(
                    (half as HTMLInputElement).value,
                );
            });

        const quanter = document.getElementById(
            "chart-setting-number-of-quanter",
        );
        if (quanter)
            quanter.addEventListener("input", () => {
                this.chartLoader.quarter = Number(
                    (quanter as HTMLInputElement).value,
                );
            });

        const triplet = document.getElementById(
            "chart-setting-number-of-triplet",
        );
        if (triplet)
            triplet.addEventListener("input", () => {
                this.chartLoader.triplet = Number(
                    (triplet as HTMLInputElement).value,
                );
            });
    }
}
