import { SpriteObject } from '@/core/SpriteObject'
import { c_, State, pipe, Maybe } from '@/utils/functional'
import * as _ from '@/utils'
import * as Physics from '@/core/Physics'
import * as Input from '@/core/Input'
import * as Vector2 from '@/utils/Vector2'
import { findInObject } from '../utils'
import { Stream } from '@/utils/Stream'

const defaultState = {
	// state props
	boost: 400,
	rotateSpeed: 270,
	rotationSinceLastBoost: 0,

	// entity prop
  alive: true,
  
  physics: true,
  bodyRadius: 8,
  collisionGroup: Physics.CollisionGroups.Player,
  collisionTargets: [
    Physics.CollisionGroups.Asteroid
  ],

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
		this.superBoost = new Stream()
	}

	update() {
		this.input.stream(pipe(
			Input.keyDown(Input.Keys.Thrust, () => this.boost()),
			Input.onKeyUp(Input.Keys.Thrust, () => this.stopBoost()),
			Input.keyDown(Input.Keys.RotateRight, () => this.rotate(1)),
			Input.keyDown(Input.Keys.RotateLeft, () => this.rotate(-1)),
			Input.onKeyDown(Input.Keys.SuperThrust, () => this.superThrust()),
		))
    this.updatePhysics()

		this.sprite.setState(this.state)
		this.state.$clean()
	}

	updatePhysics() {
		const delta = _.delta(this.game, 1)
		pipe(
			Physics.applyGravity(delta),
			Physics.applyVelocity(delta)
		)(this.state)
	}

	rotate(dir) {
    Physics.rotate(this.state, _.delta(this.game, 1), dir * this.state.rotateSpeed)
	}

	boost() {
    this.state.velocity = pipe(
      () => Vector2.fromAngle(this.state.angle),
      Vector2.multiply(this.state.boost),
      Physics.addVelocity(this.state, _.delta(this.game, 1))
    )()

		this.state.animation = "boost"
	}
	
	superThrust() {
		this.state.velocity = pipe(
      () => Vector2.fromAngle(this.state.angle),
      Vector2.multiply(this.state.boost*25),
      Physics.addVelocity(this.state, _.delta(this.game, 1))
		)()

		const boostPosition = pipe(
			() => Vector2.fromAngle(this.state.angle),
			Vector2.normalize,
			Vector2.multiply(this.sprite.height/2),
			Vector2.add(this.state.position)
		)()
		this.superBoost.push(boostPosition)
	}
  
  collisions(other) {
    const callback = findInObject({
        [Physics.CollisionGroups.Asteroid]: (T) => this.die(T)
      }, other.collisionGroup)
      .getOrElse(() => {})

    callback(other)
  }

  die(other) {

  }

	stopBoost() {
		this.state.animation = null
  }
  
  debug() {
    console.log("DEBUGGGG")
  }
}