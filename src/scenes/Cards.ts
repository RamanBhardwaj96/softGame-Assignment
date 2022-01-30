import PixiFps from "pixi-fps";
import { Scene } from "pixi-scenes";
import * as PIXI from "pixi.js";
import IScene from "./IScene";

export default class Cards extends Scene implements IScene {

    private _fpsCounter: PixiFps;
    protected _fpsLabel: PIXI.Text;

    public init(): void {
        // fps
        this._fpsCounter = new PixiFps();
        this._fpsLabel = new PIXI.Text("FPS: ", { fill: 0xffffff });

        this.addChild(this._fpsLabel, this._fpsCounter);
        this.resize();
    }

    public resize(): void {
        this._fpsCounter.position.x = this._fpsLabel.width;
        this._fpsLabel.height = this._fpsCounter.height;
    }
}