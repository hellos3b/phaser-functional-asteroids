import { SpriteObject } from '@/core/SpriteObject'
import { c_, State, pipe } from '@/utils/functional'
import * as Utils from '@/utils'
import * as Vector2 from '@/utils/Vector2'
import * as Physics from '@/core/Physics'

const defaultState = {
    alive: true,
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
        this.updatePhysics()

        if (this.outOfBounds()) return this.kill()

        this.sprite.setState(this.state)
        this.state.$clean()
    }

    updatePhysics() {
        const delta = Utils.delta(this.game, 1)
        pipe(
            Physics.applyVelocity(delta)
        )(this.state)
    }

    outOfBounds() {
        return this.state.position.x < -50 || this.state.position.x > this.game.width + 50
            || this.state.position.y < -50 || this.state.position.y > this.game.height + 50
    }

    moveTowards(target, speed) {
        this.state.velocity = Vector2
            .directionTowards(this.state.position, target)
            .normalize()
            .multiply(speed)
    }

    kill() {
        this.sprite.destroy()
        this.state.alive = false
    }
}