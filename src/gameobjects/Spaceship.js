import * as _ from '@/utils'
import * as Physics from '@/core/Physics'
import {initialState} from '@/core/Sprite'
import { pipe } from '@/utils/functional'
import * as V2 from '@/utils/Vector2'

export const Events = {
	Boost: "boost"
}

export const Entity = () => _.deepMerge(
	initialState(),
	{
		state: {
			thrustSpeed: 400,
			rotateSpeed: 270,
			rotationSinceLastBoost: 0
		},
		
		// sprite
		asset: 'spaceship',
		frame: 0,
		animations: {
			boost: {
				frames: [1, 2, 3, 4],
				loop: true,
				fps: 10
			}
		},
		animation: null,
		angle: 0,

		// Physics
		physicsEnabled: true,
		bodyRadius: 8,
		collisionGroup: Physics.CollisionGroups.Spaceship,
		collisionTargets: [
			Physics.CollisionGroups.Asteroid
		],
		gravity: true
	})

export const Thrust = stage => entity => 
	_.merge(entity, {
		animation: "boost",
		velocity: pipe(
			V2.fromAngle,
			V2.multiply(-entity.state.thrustSpeed * _.delta(stage.game)),
			V2.add(entity.velocity)
		)(entity.angle)
	})

export const StopThrust = entity => 
	_.merge(entity, {
		animation: null
	})

export const Rotate = c_(
	(stage, dir, entity) => 
		_.merge(entity, {
			angle: entity.angle += dir * entity.state.rotateSpeed * _.delta(stage.game)
		})
)

export const Boost = stage => entity => 
		_.merge(entity, {
			velocity: pipe(
				V2.fromAngle,
				V2.multiply(-entity.state.thrustSpeed * 25 * _.delta(stage.game)),
				V2.add(entity.velocity)
			)(entity.angle),
			emit: _.push(entity.emit, Events.Boost)
		})