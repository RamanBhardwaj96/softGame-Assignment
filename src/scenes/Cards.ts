import gsap from "gsap";
import PixiFps from "pixi-fps";
import { Scene } from "pixi-scenes";
import * as PIXI from "pixi.js";
import Loader from "../utils/Loader";
import IScene from "./IScene";
import Button from '../objects/Button';

export default class Cards extends Scene implements IScene {

    private _fpsCounter: PixiFps;
    protected _fpsLabel: PIXI.Text;

    private _cardNames = ["wild_black", "wild_blue", "wild_green", "wild_red", "wild_yellow"];
    private _cardStack: PIXI.Sprite;
    private _numberOfCard: PIXI.Text;
    private _cardLeft: number = 144;

    private _FlipCardFinalPosition: number[] = [];
    private _tl: GSAPTimeline;
    private _flippedCards: PIXI.Sprite[] = [];
    private _lastCardDrawn: string;

    private _backBtn: Button;

    public start(): void {
        this.removeChildren();
        this._cardLeft = 144
        // fps
        this._fpsCounter = new PixiFps();
        this._fpsLabel = new PIXI.Text("FPS: ", { fill: 0xffffff });

        // cards
        this.createCards();

        // cardsNumber
        this._numberOfCard = new PIXI.Text(`${this._cardLeft} / 144`, { fill: 0xffffff });
        this._numberOfCard.anchor.set(0.5);

        this.addChild(this._fpsLabel, this._fpsCounter, this._cardStack, this._numberOfCard, this._backBtn);

        this.resize();
    }

    public init(): void {
        this._backBtn = new Button(this.app, "BACK");
        this.addListenersOnBackBtn(["click", "touchstart"]);
    }

    private addListenersOnBackBtn(allListeners: string[]): void {
        allListeners.forEach((eventName: string) => {
            this._backBtn.on(eventName, () => {
                if (this._tl) {
                    this._tl.kill();
                    this._tl.clear();
                }
                this.scenes.start("Menu");
            });
        });
    }
    private createCards(): void {
        this._cardStack = new PIXI.Sprite(Loader.getAsset("game", "stack").texture);
        this._cardStack.anchor.set(0.5);
    }

    public resize(): void {
        if (this._tl) {
            this._tl.kill();
            this._tl.clear();

        }
        // fps positiong
        this._fpsCounter.position.x = this._fpsLabel.width;
        this._fpsLabel.height = this._fpsCounter.height;
        this._backBtn.x = this.app.screen.width - this._backBtn.width / 2;
        this._backBtn.y = this._backBtn.height / 2;

        if (window.matchMedia("(orientation: portrait)").matches) {
            this._cardStack.position.set(this.app.screen.width / 2, this.app.screen.height / 4 - this._cardStack.height / 2);
            this._FlipCardFinalPosition = [this.app.screen.width / 2, this.app.screen.height - this._cardStack.height];
        }
        else {
            // cardStack positioning
            this._cardStack.position.set(this.app.screen.width / 4 - this._cardStack.width / 2, this.app.screen.height / 2);
            this._FlipCardFinalPosition = [this.app.screen.width - this._cardStack.width, this.app.screen.height / 2];
        }
        this._numberOfCard.position.set(this._cardStack.position.x, this._cardStack.position.y - (this._cardStack.height / 1.8));

        if (this._flippedCards.length) {
            for (let index: number = 0; index < this._flippedCards.length; index++) {
                if (index == this._flippedCards.length - 1) {
                    this._flippedCards[this._flippedCards.length - 1].texture = new PIXI.Sprite(Loader.getAsset("game", this._lastCardDrawn).texture).texture;
                }
                this._flippedCards[index].position.set(this._FlipCardFinalPosition[0], this._FlipCardFinalPosition[1]);
                this._flippedCards[index].scale = this._cardStack.scale;
            }
        }
        this.playCardFlipAnimation();
    }

    private playCardFlipAnimation(): void {
        if (this._cardLeft == 0) {
            this.scenes.start("Menu");
            return;
        }

        const totalDuration: number = 1.8;
        let backCard: PIXI.Sprite = new PIXI.Sprite(Loader.getAsset("game", "back").texture);
        backCard.anchor.set(0.5, 0.55);
        backCard.position = this._cardStack.position;
        this._flippedCards.push(backCard);
        this.addChild(backCard);

        this._tl = new gsap.core.Timeline({
            delay: 0.3,
            onStart: () => {
                const randomNum: number = Math.floor(Math.random() * this._cardNames.length);
                this._lastCardDrawn = this._cardNames[randomNum]
            },
            onComplete: () => { this.playCardFlipAnimation() }
        });

        this._tl.add(() => {
            this._numberOfCard.text = `${--this._cardLeft} / 144`;
        }, 0);

        this._tl.to(this._flippedCards[this._flippedCards.length - 1], { duration: totalDuration, x: this._FlipCardFinalPosition[0], y: this._FlipCardFinalPosition[1] }, 0);
        this._tl.to(this._flippedCards[this._flippedCards.length - 1].scale, { duration: totalDuration / 3, x: 0 }, 0);
        this._tl.add(() => {
            this._flippedCards[this._flippedCards.length - 1].texture = new PIXI.Sprite(Loader.getAsset("game", this._lastCardDrawn).texture).texture;
        }, totalDuration / 3);
        this._tl.to(this._flippedCards[this._flippedCards.length - 1].scale, { duration: totalDuration / 3, x: this._cardStack.scale.x }, totalDuration / 3);
    }

}
