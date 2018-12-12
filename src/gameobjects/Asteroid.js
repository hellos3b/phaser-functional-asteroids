import { Sprite } from '@/core/Sprite'
import { c_, State } from '@/utils/functional'

const defaultState = {
    position: {
        x: 100,
        y: 100
    },
    frame: 1,
    anchor: {
        x: 0.5,
        y: 0.5
    }
}

const delta = c_( (game, value) => value * game.time.physicsElapsed )

export class Asteroid {

    constructor(game, opt) {
        this.game = game
        this.state = new State({
            ...defaultState,
            ...opt,
            asset: 'spritesheet'
        })

        this.sprite = new Sprite(game, this.state)
    }

    update() {
        this.state.position = { 
            x: this.state.position.x,
            y: this.state.position.y  + delta(this.game, 100)
        }
        this.sprite.setState(this.state)
        this.state.$clean()
    }
}