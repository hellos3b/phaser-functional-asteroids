import { Maybe, c_ } from '@/utils/functional'
import * as V2 from '../utils/Vector2'
import * as _ from '@/utils'

export const GRAVITY = { x: 0, y: -150 }

export const apply = c_(
  (delta, props) => props
      |> _.tr("gravity", incVelocity(GRAVITY, delta))
      |> updatePosition(delta)
      |> rotate(delta)
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

export const testCollisions = c_(
  (stage, entity) => Object.entries(entity.collisions)
    |> _.map(overlap(stage, entity))
    |> _.merge(entity)
)


export const overlap = c_(
  (stage, entity, [group, callback]) => _.map(sprite => {
      if (stage.game.physics.arcade.overlap(entity.sprite, sprite)) {
        console.log("collision", group, callback)
        return callback(stage, entity, sprite)
      } else {
        return entity
      }
    }, stage.groups[group].children) 
    |> _.mergeDown
)

/*
  clampVelocity = Entity -> Entity
*/
export const clampVelocity = c_(
  (max, entity) => _.merge(entity, {
      velocity: V2.clamp(max, entity.velocity)
    })
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
  (stateA, stateB) => V2.distance(stateA.position, stateB.position) <= stateA.collisionRadius || distance <= stateB.collisionRadius
)


// export const testCollisions = c_(
//   (stage, entities) =>
//     entities.forEach(checkCollision(stage))
// )