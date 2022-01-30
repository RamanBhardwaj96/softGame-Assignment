import * as PIXI from "pixi.js";
import { SceneManager } from "pixi-scenes";
import Scale from "./utils/Scale";
import Resize from "./utils/Resize";
import Splash from "./scenes/Splash";
import Menu from "./scenes/Menu";
import Gameplay from "./scenes/Gameplay";
import Throttle from "./utils/Throttle";
import IScene from "./scenes/IScene";

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
    scenes.add('splash', new Splash());
    scenes.add('menu', new Menu());
    scenes.add('gameplay', new Gameplay());

    // Start loading
    scenes.start('splash');

    // Handle various window events
    window.addEventListener('resize', Throttle(resize, 300));
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
