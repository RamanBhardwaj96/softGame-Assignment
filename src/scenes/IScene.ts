import { IScene } from 'pixi-scenes';

export default interface Scene extends IScene {
    /**
     * Handles game resize events.
     */
    resize?(): void;
}
