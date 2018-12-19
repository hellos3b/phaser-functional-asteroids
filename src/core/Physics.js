import { Maybe, c_ } from '@/utils/functional'
import * as V2 from '../utils/Vector2'
import * as _ from '@/utils'

export const GRAVITY = { x: 0, y: -150 }

export const apply = c_(
  (delta, entity) => entity
      |> _.tr("gravity", incVelocity(GRAVITY, delta))
      |> updatePosition(delta)
      |> rotate(delta)
)

export const updatePosition = c_(
  (delta, entity) => entity.$commit({
    position: {
      x: entity.position.x + (entity.velocity.x * delta),
      y: entity.position.y + (entity.velocity.y * delta)
    }
  })
)

export const incVelocity = c_(
  (v, delta, entity) => entity.$commit({
    velocity: {
      x: entity.velocity.x - (v.x * delta),
      y: entity.velocity.y - (v.y * delta)
    }
  })
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
    }, stage.$groups[group].children) 
    |> _.mergeDown
)

/*
  clampVelocity = Entity -> Entity
*/
export const clampVelocity = c_(
  (max, entity) => entity.$commit({
      velocity: V2.clamp(max, entity.velocity)
    })
)

export const rotate = c_(
  (delta, entity) => entity.$commit({
    angle: entity.angle + entity.angVelocity * delta
  })
)

export const CollisionGroups = {
  Player: "player",
  Asteroid: "asteroid"
}

export const intersects = c_(
  (stateA, stateB) => V2.distance(stateA.position, stateB.position) <= stateA.collisionRadius || distance <= stateB.collisionRadius
)

export const bounceOffCeiling = entity => {
  if (inBoundsY(entity)) return entity

  entity.stage.game.camera.shake(0.01, 60)
  return entity.$commit({
    position: { x: entity.position.x, y: 5 },
    velocity: { x: entity.velocity.x, y: entity.velocity.y * -1 }
  })
}

export const bounceWalls = entity => {
  if (inBoundsX(entity)) return entity
  entity.stage.game.camera.shake(0.01, 60)
  return entity.$commit({
    position: { x: entity.position.x < 0 ? 5 : entity.stage.game.width - 5, y: entity.position.y },
    velocity: { x: entity.velocity.x * -1, y: entity.velocity.y }
  })
}

// inBoundsX :: (Phaser.State, Entity) -> Entity
const inBoundsX = entity => entity.position.x > 0 && entity.position.x < entity.stage.game.width
const inBoundsY = entity => entity.position.y > 0


// export const testCollisions = c_(
//   (stage, entities) =>
//     entities.forEach(checkCollision(stage))
// )