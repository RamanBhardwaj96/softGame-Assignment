import * as PIXI from 'pixi.js';
import { Scene } from "pixi-scenes";
import Button from "../objects/Button";
import IScene from "./IScene";
import { AnimatedParticle, Emitter } from "pixi-particles";
import Loader from '../utils/Loader';
export default class Fire extends Scene implements IScene {
    private _backBtn: Button;
    private _emitter: Emitter[] = [];

    private readonly _configs: any[] = [
        {
            "alpha": {
                "start": 1,
                "end": 0.4
            },
            "scale": {
                "start": 0.4,
                "end": 0.1,
                "minimumScaleMultiplier": 1
            },
            "color": {
                "start": "#ffffff",
                "end": "#ffffff"
            },
            "speed": {
                "start": 10,
                "end": 20,
                "minimumSpeedMultiplier": 1
            },
            "acceleration": {
                "x": 0,
                "y": -75
            },
            "maxSpeed": 280,
            "startRotation": {
                "min": 280,
                "max": 255
            },
            "noRotation": true,
            "rotationSpeed": {
                "min": 5,
                "max": 5
            },
            "lifetime": {
                "min": 0.5,
                "max": 1
            },
            "blendMode": "add",
            "frequency": 0.1,
            "emitterLifetime": -1,
            "maxParticles": 50,
            "pos": {
                "x": 0,
                "y": 0,
            },
            "addAtBack": false,
            "spawnType": "rect",
            "spawnRect": {
                "x": 0,
                "y": 0,
                "w": 0,
                "h": 1
            }
        },
        {
            "alpha": {
                "start": 1,
                "end": 0.4
            },
            "scale": {
                "start": 0.4,
                "end": 0.1,
                "minimumScaleMultiplier": 1
            },
            "color": {
                "start": "#ffffff",
                "end": "#ffffff"
            },
            "speed": {
                "start": 10,
                "end": 20,
                "minimumSpeedMultiplier": 1
            },
            "acceleration": {
                "x": 0,
                "y": -75
            },
            "maxSpeed": 320,
            "startRotation": {
                "min": 280,
                "max": 255
            },
            "noRotation": true,
            "rotationSpeed": {
                "min": 5,
                "max": 5
            },
            "lifetime": {
                "min": 0.5,
                "max": 1
            },
            "blendMode": "add",
            "frequency": 0.1,
            "emitterLifetime": -1,
            "maxParticles": 50,
            "pos": {
                "x": 0,
                "y": 0,
            },
            "addAtBack": false,
            "spawnType": "rect",
            "spawnRect": {
                "x": 0,
                "y": 0,
                "w": 0,
                "h": 1
            }
        },
        {
            "alpha": {
                "start": 1,
                "end": 0.4
            },
            "scale": {
                "start": 0.4,
                "end": 0.1,
                "minimumScaleMultiplier": 1
            },
            "color": {
                "start": "#ffffff",
                "end": "#ffffff"
            },
            "speed": {
                "start": 10,
                "end": 20,
                "minimumSpeedMultiplier": 1
            },
            "acceleration": {
                "x": 0,
                "y": -75
            },
            "maxSpeed": 380,
            "startRotation": {
                "min": 280,
                "max": 255
            },
            "noRotation": true,
            "rotationSpeed": {
                "min": 5,
                "max": 5
            },
            "lifetime": {
                "min": 0.5,
                "max": 1
            },
            "blendMode": "add",
            "frequency": 0.1,
            "emitterLifetime": -1,
            "maxParticles": 50,
            "pos": {
                "x": 0,
                "y": 0,
            },
            "addAtBack": false,
            "spawnType": "rect",
            "spawnRect": {
                "x": 0,
                "y": 0,
                "w": 0,
                "h": 1
            }
        },
        {
            "alpha": {
                "start": 1,
                "end": 0.4
            },
            "scale": {
                "start": 0.4,
                "end": 0.1,
                "minimumScaleMultiplier": 1
            },
            "color": {
                "start": "#ffffff",
                "end": "#ffffff"
            },
            "speed": {
                "start": 10,
                "end": 20,
                "minimumSpeedMultiplier": 1
            },
            "acceleration": {
                "x": 0,
                "y": -75
            },
            "maxSpeed": 400,
            "startRotation": {
                "min": 280,
                "max": 255
            },
            "noRotation": true,
            "rotationSpeed": {
                "min": 5,
                "max": 5
            },
            "lifetime": {
                "min": 0.5,
                "max": 1
            },
            "blendMode": "add",
            "frequency": 2,
            "emitterLifetime": -1,
            "maxParticles": 10,
            "pos": {
                "x": 0,
                "y": 0,
            },
            "addAtBack": false,
            "spawnType": "rect",
            "spawnRect": {
                "x": 0,
                "y": 0,
                "w": 0,
                "h": 1
            }
        }
    ];

    public init(): void {
        this._backBtn = new Button(this.app, "BACK");
        this.addListenersOnBackBtn(["click", "touchstart"]);
    }

    public start(): void {
        this.app.renderer.backgroundColor = 0x000000;
        this.resize();
        const textures = [
            new PIXI.Sprite(Loader.getAsset("game", "fire1").texture),
            new PIXI.Sprite(Loader.getAsset("game", "fire2").texture),
            new PIXI.Sprite(Loader.getAsset("game", "fire3").texture),
            new PIXI.Sprite(Loader.getAsset("game", "fire4").texture),
            new PIXI.Sprite(Loader.getAsset("game", "fire5").texture),
        ];
        this.addParticles(textures);
        this.addChild(this._backBtn);
    }

    private addListenersOnBackBtn(allListeners: string[]): void {
        allListeners.forEach((eventName: string) => {
            this._backBtn.on(eventName, () => {
                this.scenes.start("Menu");
            });
        });
    }

    public resize(): void {
        this._backBtn.x = this.app.screen.width - this._backBtn.width / 2;
        this._backBtn.y = this._backBtn.height / 2;

        this._configs.forEach((config: any) => {
            config.spawnRect = {
                x: 0,
                y: this.app.screen.height / 2,
                w: this.app.screen.width,
                h: this.app.screen.height
            }

            config.lifetime = {
                min: 2, max: 5
            }
        });
        if (this._emitter.length) {
            this._emitter.forEach((emitter: Emitter) => {
                emitter.cleanup();
                if (window.matchMedia("(orientation: portrait)").matches) {
                    emitter.spawnPos.y = this.app.screen.height / 2;

                }
                else {
                    emitter.spawnPos.y = this.app.screen.height / 4;
                }
            });
        }

    }

    public stop(): void {
        this._emitter.forEach((emitter: Emitter) => {
            emitter.emit = false;
        });
        this.app.renderer.backgroundColor = 0x1099bb;
    }

    private addParticles(textures: any) {
        const container: PIXI.Container = new PIXI.Container();
        this.addChild(container);

        const textOptions = {
            framerate: 10,
            loop: true,
            textures
        };

        this._configs.forEach((config: any) => {
            const emitter = new Emitter(container, [textOptions], config);
            let now = Date.now();
            this.app.ticker.add(() => {
                const newNow = Date.now();
                emitter.update((newNow - now) * 0.001);
                now = newNow;
            });
            this._emitter.push(emitter);
            emitter.particleConstructor = AnimatedParticle;
            emitter.emit = true;
        });
    }

}
