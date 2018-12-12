import { SpriteObject } from '@/core/SpriteObject'
import { loadAnimations } from '@/core/Sprite'
import { c_, State, pipe } from '@/utils/functional'
import * as Utils from '@/utils'
import * as Physics from '@/core/Physics'
import * as Input from '@/core/Input'
import { Vector2 } from '../utils/Vector2';

const defaultState = {
	// state props
	boost: 400,
	rotateSpeed: 180,

	// entity prop
	alive: true,

	// sprite props
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
	velocity: {
		x: 0,
		y: 0
	},
	animation: null,
	angle: 0
}

const animations = {
	boost: {
		frames: [1, 2, 3, 4],
		loop: true,
		fps: 10
	}
}

export class Spaceship {

	constructor(game, opt) {
		this.game = game
		this.state = new State({
			...defaultState,
			...opt
		})

		this.sprite = new SpriteObject(game, this.state)
		loadAnimations(this.sprite, animations)

		this.input = new Input.InputStream()
	}

	update() {
		this.input.stream(pipe(
			Input.keyDown(Input.Keys.Thrust, 			() => this.boost()),
			Input.onKeyUp(Input.Keys.Thrust, 			() => this.stopBoost()),
			Input.keyDown(Input.Keys.RotateRight, () => this.rotate(1)),
			Input.keyDown(Input.Keys.RotateLeft, 	() => this.rotate(-1))
		))
		this.updatePhysics()
		this.sprite.setState(this.state)
		this.state.$clean()
	}

	updatePhysics() {
		const delta = Utils.delta(this.game, 1)
		pipe(
			Physics.applyGravity(delta),
			Physics.applyVelocity(delta)
		)(this.state)
	}

	rotate(dir) {
		this.state.angle += Utils.delta(this.game, dir * this.state.rotateSpeed)
	}

	boost() {
		const direction = new Vector2(0, 1)
			.rotate(Utils.toRadians(this.state.angle))
		this.state.velocity = {
			x: this.state.velocity.x - Utils.delta(this.game, this.state.boost * direction.x),
			y: this.state.velocity.y - Utils.delta(this.game, this.state.boost * direction.y)
		}
		this.state.animation = "boost"
	}

	stopBoost() {
		this.state.animation = null
	}
}