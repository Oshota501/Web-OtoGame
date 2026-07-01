import { Texture } from "pixi.js";

export default class AssetsLoader {
    public textures: Map<string, Texture> = new Map<string, Texture>();

    private constructor() {}

    private static instance: AssetsLoader;

    public static New() {
        AssetsLoader.instance = new AssetsLoader();

        return AssetsLoader.instance;
    }

    public static Get() {
        return AssetsLoader.instance;
    }
}
