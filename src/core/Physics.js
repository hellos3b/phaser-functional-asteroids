import { Maybe, c_ } from '@/utils/functional'
import { Vector2, add } from '../utils/Vector2'
import { pipe } from '../utils/functional'
import * as _ from '@/utils'

export const GRAVITY = { x: 0, y: -150 }

export const apply = c_(
  (delta, props) => 
    pipe(
      props.gravity ? incVelocity(GRAVITY, delta) : _.id,
      updatePosition(delta),
      rotate(delta)
    )(props)
)

export const updatePosition = c_(
  (delta, props) => {
    props.position = {
      x: props.position.x + (props.velocity.x * delta),
      y: props.position.y + (props.velocity.y * delta)
    }
    return props
  }
)

export const incVelocity = c_(
  (v, delta, props) => {
    const { velocity } = props
    props.velocity = {
      x: velocity.x - (v.x * delta),
      y: velocity.y - (v.y * delta)
    }
    return props
  }
)

export const rotate = c_(
  (delta, props) => {
    props.angle += props.angVelocity * delta
    return props
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