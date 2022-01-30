import { Scene } from "pixi-scenes";
import Button from "../objects/Button";
import IScene from "./IScene";

export default class Menu extends Scene implements IScene {

    private startButton: Button;

    public init(): void {
        this.startButton = new Button(this.app, 'CONTINUE');
        this.addListenersOnContinueBtn(["click", "touchstart"]);
        this.addChild(this.startButton);
    }

    private addListenersOnContinueBtn(allListeners: string[]): void {
        allListeners.forEach((eventName: string) => {
            this.startButton.on(eventName, () => { this.startGame() });
        });
    }

    public start(): void {
        this.resize();
    }

    private startGame(): void {
        this.scenes.start('gameplay');
    }

    public resize(): void {
        this.startButton.x = this.app.screen.width / 2;
        this.startButton.y = this.app.screen.height / 2;
    }
}
