import * as _ from '@/utils'
import * as Physics from '@/core/Physics'
import * as Entity from '@/models/Entity'
import { pipe } from '@/utils/functional'
import * as V2 from '@/utils/Vector2'
import * as EventManager from '@/core/Events'
import * as Stage from '@/core/Stage'
import {PlayerInput } from '@/core/Input'
import * as BoostEntity from '@/gameobjects/Boost'

export const Events = {
	Boost: "boost"
}

export const Create = () => 
	Entity.model({
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
		gravity: true,

		update
	})

const update = c_(
	(stage, entity) => entity.input(entity)
)

/*
  create :: Phaser.State -> Spaceship
*/
export const create = stage =>
	_.merge(Create(), {
		position : Stage.centerPosition(stage.world),
		input    : PlayerInput(stage),
		events   : EventManager.Events(stage, PlayerEvents())
	})

/*
  playerEvents :: () -> Map(string, function) -> Entity
*/
const PlayerEvents = () => ({
  [Events.Boost]: (stage, entity) => {
    Stage.addEntity(stage, BoostEntity.create(stage, entity))
    stage.game.camera.shake(0.01, 60)
    return entity
  }
})

/*
	Accelerate :: Phaser.State -> Entity -> Entity
*/
export const Accelerate = stage => entity => 
	_.merge(entity, {
		animation: "boost",
		velocity: entity.angle |> V2.fromAngle
			|> V2.multiply(-entity.state.thrustSpeed * _.delta(stage.game))
			|> V2.add(entity.velocity)
	})

/*
	StopAccelerating :: Entity -> Entity
*/
export const StopAccelerating = entity => 
	_.merge(entity, {
		animation: null
	})

/*
	Rotate :: (Phaser.State, Int, Entity) -> Entity
*/
export const Rotate = c_(
	(stage, dir, entity) => 
		_.merge(entity, {
			angle: entity.angle += dir * entity.state.rotateSpeed * _.delta(stage.game)
		})
)

/*
	Boost :: (Phaser.State, Entity) -> Entity
*/
export const Boost = c_(
	(stage, entity) => _.merge(
		entity.events(entity, Events.Boost), 
		{
			velocity: V2.fromAngle(entity.angle)
				|> V2.multiply(-entity.state.thrustSpeed * 25 * _.delta(stage.game))
				|> V2.add(entity.velocity)
		}
	)
)