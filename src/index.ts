import * as PIXI from "pixi.js";
import { SceneManager } from "pixi-scenes";
import Scale from "./utils/Scale";
import Resize from "./utils/Resize";
import Splash from "./scenes/Splash";
import Menu from "./scenes/Menu";
import Throttle from "./utils/Throttle";
import IScene from "./scenes/IScene";
import Cards from "./scenes/Cards";
import ImagesAndText from "./scenes/ImagesAndText";
import Fire from "./scenes/Fire";

let app: PIXI.Application,
    scenes: SceneManager

function setup(): void {
    const content: HTMLDivElement = <HTMLDivElement>document.getElementById('content');
    if (!content) {
        throw new Error('Could not find div named content in document!');
    }
    if (app) {
        throw new Error('Setup has been done before!');
    }

    // Setup and configure application
    app = new PIXI.Application({
        autoDensity: true,
        resolution: window.devicePixelRatio || 1,
        backgroundColor: 0x1099bb,
    });
    content.appendChild(app.view);

    // Setup right app size
    resize();

    // Add all scenes
    scenes = new SceneManager(app);
    scenes.add('Splash', new Splash()); // loader
    scenes.add('Menu', new Menu()); // showsOption
    scenes.add('Cards', new Cards()); // option-1 cards
    scenes.add('ImageAndText', new ImagesAndText()); //option-2 imagesAndText
    scenes.add('Fire', new Fire()); // opttion-3 fireAnim

    // Start loading
    scenes.start('Splash');

    // Handle various window events
    window.addEventListener('resize', Throttle(resize, 100));
}

function resize(): void {
    if (!app) {
        return;
    }

    const newResolution: [number, number] = Scale.fitAspect(window.innerWidth, window.innerHeight, window.innerWidth / window.innerHeight),
        hasResized: boolean = Resize(app.renderer, newResolution[0], newResolution[1]);

    if (hasResized && scenes) {
        const activeScene: IScene = scenes.active;
        if (activeScene && typeof activeScene.resize === 'function') {
            activeScene.resize();
        }
    }
}

// Entry
window.addEventListener('load', setup);
