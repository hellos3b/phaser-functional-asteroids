import { SpriteObject } from '@/core/SpriteObject'
import { loadAnimations } from '@/core/Sprite'
import { State } from '@/utils/functional'
import * as _ from '@/utils'

export const Boost = {
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
}

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