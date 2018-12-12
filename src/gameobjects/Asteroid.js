import { SpriteObject } from '@/core/SpriteObject'
import { c_, State } from '@/utils/functional'
import * as Utils from '@/utils'
import * as Vector2 from '@/utils/Vector2'
import * as Physics from '@/core/Physics'

const defaultState = {
    position: {
        x: 100,
        y: 100
    },
    frame: 1,
    anchor: {
        x: 0.5,
        y: 0.5
    },
    asset: 'spritesheet',
    speed: 100,
    velocity: {
        x: 0,
        y: 0
    }
}

export class Asteroid {

    constructor(game, opt) {
        this.game = game
        this.state = new State({
            ...defaultState,
            ...opt
        })

        this.sprite = new SpriteObject(game, this.state)
    }

    update() {
        Physics.update(this.state, Utils.delta(this.game, 1))
        this.sprite.setState(this.state)
        this.state.$clean()
    }

    moveTowards(target) {
        this.state.velocity = Vector2
            .directionTowards(this.state.position, target)
            .normalize()
    }
}