import * as _ from '@/utils'
import * as Physics from '@/core/Physics'
import * as Entity from '@/models/Entity'
import { pipe } from '@/utils/functional'
import * as V2 from '@/utils/Vector2'
import * as EventManager from '@/core/Events'
import * as Stage from '@/core/Stage'
import {PlayerInput } from '@/core/Input'
import * as BoostEntity from '@/gameobjects/Boost'
import { Vector2 } from '../utils/Vector2';

export const Events = {
  Boost: "boost"
}

const MAX_VELOCITY = 400

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
    |> bounceOffWall(stage)
    |> clampVelocity
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
    BoostEntity.create(stage, entity) |> Stage.addEntity(stage)
    stage.game.camera.shake(0.01, 60)
    return entity
  }
})

/*
  bounceOffWall :: Spaceship -> Spaceship
*/
const bounceOffWall = c_(
  (stage, entity) => inBoundsX(stage, entity) ? entity
    : _.merge(entity, {
      position: {
        x: entity.position.x < 0 ? 5 : stage.game.width - 5,
        y: entity.position.y
      },
      velocity: {
        x: entity.velocity.x * -1,
        y: entity.velocity.y
      }
    })
)

const clampVelocity = entity => 
  _.merge(entity, {
    velocity: V2.clamp(MAX_VELOCITY, entity.velocity) // |> V2.json
  })

const flipBonus = entity =>
  

/*
    inBoundsX :: (Phaser.State, Entity) -> Entity
*/
const inBoundsX = c_(
  (stage, entity) => entity.position.x > 0 && entity.position.x < stage.game.width
)

/*
  Accelerate :: Phaser.State -> Spaceship -> Spaceship
*/
export const Accelerate = stage => entity => 
  _.merge(entity, {
    animation: "boost",
    velocity: V2.fromAngle(entity.angle)
      |> V2.multiply(-entity.state.thrustSpeed * _.delta(stage.game))
      |> V2.add(entity.velocity)
  })

/*
  StopAccelerating :: Spaceship -> Spaceship
*/
export const StopAccelerating = entity => 
  _.merge(entity, {
    animation: null
  })

/*
  Rotate :: (Phaser.State, Int, Spaceship) -> Spaceship
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