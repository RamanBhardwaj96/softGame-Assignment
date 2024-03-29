import * as PIXI from "pixi.js";
import { Scene } from "pixi-scenes";
import Loader from "../utils/Loader";
import LoadIndicator from "../objects/LoadIndicator";
import IScene from "./IScene";

export default class Splash extends Scene implements IScene {

    /**
     * Minimal time in ms that the splash should be shown if loading goes too fast.
     */
    private static MIN_LOADING_TIME: number = 1000;

    private loader: PIXI.Loader;
    private loadIndicator: LoadIndicator;
    private currentTime: number;

    public init(): void {

        const assets: { [name: string]: string } = {
            stack: "assets/images/Stack.png",
            back: "assets/images/cards/back.png",
            wild_black: "assets/images/cards/wild_black.png",
            wild_blue: "assets/images/cards/wild_blue.png",
            wild_green: "assets/images/cards/wild_green.png",
            wild_red: "assets/images/cards/wild_red.png",
            wild_yellow: "assets/images/cards/wild_yellow.png",

            fire1: "assets/images/fireParticles/fire1.png",
            fire2: "assets/images/fireParticles/fire2.png",
            fire3: "assets/images/fireParticles/fire3.png",
            fire4: "assets/images/fireParticles/fire4.png",
            fire5: "assets/images/fireParticles/fire5.png",
            bunny: "assets/images/bunny.png"

        };

        // Start loading game assets
        this.loader = Loader.loadBatch('game', assets);
        this.loader.on("progress", this.updateStatus.bind(this, null));
        this.loader.on("complete", this.updateStatus.bind(this, 100));

        this.loadIndicator = new LoadIndicator();
        this.loadIndicator.anchor.set(0.5);
        this.loadIndicator.on("finished", this.checkComplete.bind(this));
        this.addChild(this.loadIndicator);
    }

    public start() {
        this.currentTime = 0;
        this.loadIndicator.reset();
        this.updateStatus();
        this.resize();
    }

    public resize(): void {
        this.loadIndicator.x = this.app.screen.width / 2;
        this.loadIndicator.y = this.app.screen.height / 2
    }

    public update(delta: number): void {
        this.loadIndicator.update(delta);

        // Show the splash for a minimumtime if loading is done
        if (this.currentTime < Splash.MIN_LOADING_TIME) {
            this.currentTime += delta;
            this.checkComplete();
        }
    }

    private updateStatus(progress?: number): void {
        this.loadIndicator.progress = progress || this.loader.progress;
    }

    private checkComplete(): void {
        if (this.currentTime >= Splash.MIN_LOADING_TIME && this.loadIndicator.completed && this.loadIndicator.progress === 100) {
            this.openMenu();
        }
    }

    private openMenu(): void {
        this.scenes.start('Menu');
    }
}
