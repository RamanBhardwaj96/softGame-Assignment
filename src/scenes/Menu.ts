import { Scene } from "pixi-scenes";
import Button from "../objects/Button";
import IScene from "./IScene";

export default class Menu extends Scene implements IScene {

    private _startButtonOptions: Button[] = [];
    private _startButtonOptionsLabel: string[] = ["Cards", "ImageAndText", "Fire"];

    public init(): void {
        for (let index: number = 0; index < 3; index++) {
            const btn: Button = new Button(this.app, this._startButtonOptionsLabel[index]);
            this.addChild(btn);
            this._startButtonOptions.push(btn);

        }
        this.addListenersOnContinueBtn(["click", "touchstart"]);
    }

    private addListenersOnContinueBtn(allListeners: string[]): void {
        for (let index: number = 0; index < this._startButtonOptions.length; index++) {
            allListeners.forEach((eventName: string) => {
                this._startButtonOptions[index].on(eventName, () => { this.startGame(this._startButtonOptionsLabel[index]) });
            });
        }
    }

    public start(): void {
        this.resize();
    }

    private startGame(option: string): void {
        this.scenes.start(option);
    }

    public resize(): void {
        this._startButtonOptions.forEach((btn: Button, index: number) => {
            btn.position.x = this.app.screen.width / 2;
            btn.position.y = this.app.screen.height / 2 + ((btn.height + 5) * (index - 1));
        });

    }
}
