import { Application } from "pixi.js";
// import AssetsLoader from "./MainGame/AssetLoader/AssetLoader";
import MainGame from "./MainGame/MainGame";

(async () => {
    // Create a new application
    const app = new Application();
    await app.init({ background: "#1099bb", resizeTo: window });

    document.getElementById("pixi-container")!.appendChild(app.canvas);

    // const assets = AssetsLoader.New();

    const game = new MainGame(4);

    app.stage.addChild(game.screen);

    // Listen for animate update
    app.ticker.add((t) => {
        game.tick(t);
    });
})();
