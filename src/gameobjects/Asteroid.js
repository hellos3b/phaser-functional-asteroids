import { Sprite } from '@/core/Sprite'

const defaultState = {
    x: 100,
    y: 100,
    frame: 1,
    anchorX: 0.5,
    anchorY: 0.5
}

export class Asteroid {

    constructor(game, opt) {
        this.state = {
            ...defaultState,
            ...opt,
            asset: 'spritesheet'
        }

        this.sprite = new Sprite(game, this.state)
    }

    update() {

    }
}