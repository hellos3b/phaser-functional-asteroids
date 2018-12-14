import { Maybe, c_ } from '@/utils/functional'
import { Vector2 } from '../utils/Vector2'

export const GRAVITY = -150

export const applyVelocity = c_(
	(delta, state) => {
		state.position = {
			x: state.position.x + (state.velocity.x * delta),
			y: state.position.y + (state.velocity.y * delta)
		}
		return state
	}
)

export const applyGravity = c_(
	(delta, state) => {
		state.velocity = {
			x: state.velocity.x,
			y: state.velocity.y - (GRAVITY * delta)
		}
		return state
	}
)

export const addVelocity = c_(
	(state, delta, velocity) => ({
		x: state.velocity.x - (velocity.x * delta),
		y: state.velocity.y - (velocity.y * delta)
	})
)

export const rotate = c_(
	(state, delta, rotation) => {
		state.angle += rotation * delta
	}
)

export const CollisionGroups = {
	Player: "player",
	Asteroid: "asteroid"
}

export const intersects = c_(
	(stateA, stateB) => {
		const distance = new Vector2(stateA.position.x, stateA.position.y)
			.distance(new Vector2(stateB.position.x, stateB.position.y))

		return distance <= stateA.collisionRadius || distance <= stateB.collisionRadius
	}
)

export const overlap = c_(
	(stage, entity, group) => 
		stage.game.physics.arcade.overlap(
			entity.sprite,
			stage.groups[group],
			entity.collisions,
			null,
			entity
		)

)

export const checkCollision = c_(
	(stage, entity) =>
		entity
			.state
			.collisionTargets
			.forEach(overlap(stage, entity))
)

export const testCollisions = c_(
	(stage, entities) =>
		entities.forEach(checkCollision(stage))
)