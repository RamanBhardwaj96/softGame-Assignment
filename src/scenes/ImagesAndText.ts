import * as PIXI from "pixi.js"
import { Scene } from "pixi-scenes";
import Button from "../objects/Button";
import IScene from "./IScene";
import Loader from '../utils/Loader';
import gsap from "gsap";

export default class ImagesAndText extends Scene implements IScene {

    private _backBtn: Button;
    private _textImageContainer: PIXI.Container;
    private _timeline: gsap.core.Timeline;
    private _bunnny: PIXI.Sprite;

    public init(): void {
        this._backBtn = new Button(this.app, "BACK");

        this.addListenersOnBackBtn(["click", "touchstart"]);
        this._textImageContainer = new PIXI.Container();

        this.addChild(this._backBtn, this._textImageContainer);




        this._bunnny = new PIXI.Sprite(Loader.getAsset("game", "bunny").texture);

        this._textImageContainer.addChild(this._bunnny);

        this.resize();
    }

    public start(): void {
        this._timeline = new gsap.core.Timeline({ repeat: -1, repeatDelay: 2 });
        this._timeline.add(() => {
            this._textImageContainer.removeChildren();
            const randomNum: number = Math.floor(Math.random() * 4) + 2;
            const layout: string[] = this.createRandomLayout(randomNum);

            for (let index = 0; index < layout.length; index++) {
                switch (layout[index]) {
                    case "Text":
                        this._textImageContainer.addChild(this.createRandomText());
                        break;
                    case "Image":
                        this._textImageContainer.addChild(this.createBunnyImage());
                        break;
                }

            }
            console.log(layout);
            this.repositionElements(layout);
        }, 0.01);

    }

    private repositionElements(itemLayout: string[]): void {
        let nexPosX: number = 0;
        let overAllWidth: number = 0;
        for (let index: number = 0; index < itemLayout.length; index++) {
            switch (itemLayout[index]) {
                case "Text":
                    this._textImageContainer.children[index].position.x = overAllWidth;
                    overAllWidth += 2 + nexPosX + (this._textImageContainer.children[index] as PIXI.Text).width;
                    break;
                case "Image":
                    this._textImageContainer.children[index].position.x = overAllWidth - (this._textImageContainer.children[index] as any).width;
                    overAllWidth += 2 + nexPosX + (this._textImageContainer.children[index] as PIXI.Text).width;
                    break;
            }

        }
        this._textImageContainer.position.set(this.app.screen.width / 2, this.app.screen.height / 2);
        this._textImageContainer.position.x -= overAllWidth / 2
    }

    private createBunnyImage(): PIXI.Sprite {
        const bunnny: PIXI.Sprite = new PIXI.Sprite(Loader.getAsset("game", "bunny").texture);
        bunnny.anchor.set(0.4, 0.5);
        return bunnny;
    }

    private createRandomText(): PIXI.Text {
        const textLabel: PIXI.Text = new PIXI.Text("Bunny", { filll: 0xffffff });
        textLabel.anchor.set(0.5);
        return textLabel;
    }

    private createRandomLayout(totalItem: number): string[] {
        const layout: string[] = [];

        for (let index = 0; index < totalItem; index++) {
            if ((Math.floor(Math.random() * 99) % 2) == 0) {
                layout.push("Text");
            } else {
                layout.push("Image");
            }
        }

        if (layout.indexOf("Image") === -1) {
            layout[Math.floor(totalItem / 2)] = "Image";
        }
        else if (layout.indexOf("Text") === -1) {
            layout[Math.floor(totalItem / 2)] = "Text";
        }
        return layout;
    }

    public resize(): void {
        this._backBtn.x = this.app.screen.width - this._backBtn.width / 2;
        this._backBtn.y = this._backBtn.height / 2;

        this._textImageContainer.position.set(this.app.screen.width / 2, this.app.screen.height / 2);
    }

    private addListenersOnBackBtn(allListeners: string[]): void {
        allListeners.forEach((eventName: string) => {
            this._backBtn.on(eventName, () => {
                this.scenes.start("Menu");
                this._timeline.kill();
                this._timeline.clear();
            });
        });
    }
}
