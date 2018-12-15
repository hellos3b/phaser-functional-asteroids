import { SpriteObject } from '@/core/SpriteObject'
import { die } from '@/core/Sprite'
import { State, pipe } from '@/utils/functional'
import * as _ from '@/utils'
import * as V2 from '@/utils/Vector2'
import * as Events from '@/core/Events'

export const defaultState = () => ({
	alive: true,
	group: "default",
	position: {
		x: 100,
		y: 100
	},
	frame: 0,
	anchor: {
		x: 0.5,
		y: 0.5
	},
	asset: 'spaceship',
	animations: {
		play: {
			frames: [6, 7, 8, 9],
			fps: 20,
			onDone: "done"
		}
	},
	animation: "play",
})

const SPAWN_OFFSET = 16

export const getPosition = spaceship => pipe(
		V2.fromAngle,
		V2.multiply(SPAWN_OFFSET),
		V2.add(spaceship.position)
	)(spaceship.angle)

const BoostEvents = () => ({
	"done": (stage, entity) => die(entity)
})

export const create = c_(
	(stage, target) => 
		_.merge(
			defaultState(), {
        position: getPosition(target),
        events: Events.Events(stage, BoostEvents())
      })
)

// export class Boost {

// 	constructor(game, opt) {
// 		this.game = game
// 		this.state = new State({
// 			...defaultState,
// 			...opt
// 		})

// 		this.sprite = new SpriteObject(game, this.state)

// 		this.sprite.animations.currentAnim.onComplete.add(() => this.die())
// 	}

// 	update() {
// 		this.sprite.setState(this.state)
// 		this.state.$clean()		
// 	}

// 	die() {
// 		this.sprite.destroy()
// 		this.state.alive = false
// 	}
// }