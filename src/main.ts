import { Application } from "pixi.js";
// import AssetsLoader from "./MainGame/AssetLoader/AssetLoader";
import MainGame from "./MainGame/MainGame";
import MusicPlayer from "./MusicPlayer/MusicPlayer";
import DomEventAdder from "./Dom/DomEventAdder";

window.onload = async () => {
    // Create a new application
    const app = new Application();
    await app.init({ background: "#1099bb", resizeTo: window });

    document.getElementById("pixi-container")!.appendChild(app.canvas);

    // const assets = AssetsLoader.New();

    const game = new MainGame(4);

    const player = new MusicPlayer(game);

    new DomEventAdder(player);

    app.stage.addChild(game.screen);

    // Listen for animate update
    app.ticker.add((t) => {
        game.tick(t);
        player.tick(t);
    });
};
