import { SpriteObject } from '@/core/SpriteObject'
import { c_, State } from '@/utils/functional'
import * as Utils from '@/utils'

const defaultState = {
    position: {
        x: 100,
        y: 100
    },
    frame: 0,
    anchor: {
        x: 0.5,
        y: 0.5
    },
    asset: 'spritesheet'
}

export class Spaceship {

    constructor(game, opt) {
        this.game = game
        this.state = new State({
            ...defaultState,
            ...opt
        })

        this.sprite = new SpriteObject(game, this.state)
    }

    update() {
        // this.state.position = { 
        //     x: this.state.position.x,
        //     y: this.state.position.y  + Utils.delta(this.game, 100)
        // }
        this.sprite.setState(this.state)
        this.state.$clean()
    }
}