import * as _ from '@/utils'
import * as Physics from '@/core/Physics'
import * as Entity from '@/models/Entity'
import * as V2 from '@/utils/Vector2'
import * as EventManager from '@/core/Events'
import * as Stage from '@/core/Stage'
import * as Input from '@/core/Input'
import * as BoostEntity from '@/gameobjects/Boost'
import * as FlipEntity from '@/gameobjects/FlipEffect'
import * as ExplodeEntity from '@/gameobjects/Explosion'
import * as Audio from '@/core/Audio'

const MAX_VELOCITY = 400

export const Events = {
  Boost: "boost",
  Die: "died"
}

const listeners = () => ({
  [Events.Boost]: createBoost,
  [Events.FlipBonus]: doFlip
})

const collisions = () => ({
  [Physics.CollisionGroups.Asteroid]: collideAsteroid
})

// Input :: (Phaser.State, Spaceship) -> Spaceship
const input = c_(
  (stage, entity) => {
    const { keyDown, onKeyUp, onKeyDown, Keys} = Input

    return entity
      |> keyDown(Keys.Accelerate, Accelerate(stage))
      |> onKeyUp(Keys.Accelerate, StopAccelerating)
      |> keyDown(Keys.RotateRight,Rotate(stage, 1))
      |> keyDown(Keys.RotateLeft, Rotate(stage, -1))
      |> onKeyDown(Keys.Boost,    Boost(stage))
})

const collideAsteroid = c_(
  (stage, entity, target) => explode(stage, entity)
)

const createBoost = c_(
  (stage, entity) => {
    BoostEntity.create(stage, entity) |> Stage.addEntity(stage)
    stage.game.camera.shake(0.01, 60)
    return entity
  }
)

const doFlip = c_(
  (stage, entity) => {
    Audio.play("flip")
    FlipEntity.create(stage, entity) |> Stage.addEntity(stage)
    const bonus = _.toLerp(100, 400, stage._state.playerVelocity) |> _.lerp(0.05, 0.2)
    stage._state.$commit({
      score: stage._state.score + (stage._state.score*bonus)
    })
    return entity
  }
)

// update :: (Phaser.State, Spaceship) -> Spaceship
const update = c_(
  (stage, entity) => entity.input(entity) 
    |> checkFlipBonus
    |> bounceOffWall(stage)
    |> bounceOffRoof(stage)
    |> Physics.clampVelocity(MAX_VELOCITY) // todo maybe be physics prop
    |> checkBottomCrash(stage)
    |> updateGameVelocity(stage)
)

// todo shouldn't need to be a state variable
const updateGameVelocity = c_(
  (stage, entity) => {
    stage._state.$commit({ playerVelocity: V2.magnitude(entity.velocity) })
    return entity
  }
)

const explode = c_(
  (stage, entity) => {
    Audio.play("dead")
    stage.game.camera.shake(0.04, 120)
    ExplodeEntity.create(stage, entity) |> Stage.addEntity(stage)
    entity.events(entity, Events.Die)
    stage._state.$commit({ end: true })
    return Entity.die(entity)
  }
)

// create :: Phaser.State -> Spaceship
export const create = (stage, events) =>
  _.merge(Create(), {
    position : Stage.centerPosition(stage.world),
    input    : input(stage),
    events   : _.merge(listeners(), events) |> EventManager.Events(stage)
  })

// bounceOffWall :: Spaceship -> Spaceship
const bounceOffWall = c_(
  (stage, entity) => {
    if (inBoundsX(stage, entity)) return entity

    stage.game.camera.shake(0.01, 60)
    return _.merge(entity, {
      position: {
        x: entity.position.x < 0 ? 5 : stage.game.width - 5,
        y: entity.position.y
      },
      velocity: {
        x: entity.velocity.x * -1,
        y: entity.velocity.y
      }
    })
  }
)

const checkBottomCrash = c_(
  (stage, entity) => entity.position.y < stage.game.height 
    ? entity 
    : explode(stage, entity)
)

const bounceOffRoof = c_(
  (stage, entity) => {
    if (inBoundsY(stage, entity)) return entity

    stage.game.camera.shake(0.01, 60)
    return _.merge(entity, {
      position: {
        x: entity.position.x,
        y: 5
      },
      velocity: {
        x: entity.velocity.x,
        y: entity.velocity.y * -1
      }
    })
  }
)

// checkFlipBonus :: Spaceship -> Spaceship
const checkFlipBonus = entity => gotFlipBonus(entity) ? emitBonus(entity) : entity

// gotFlipBonus :: Spaceship -> Boolean
const gotFlipBonus = entity => Math.abs(entity.rotationSinceAcceleration) >= 360

// emitBonus :: Spaceship -> Spaceship
const emitBonus = entity => 
  _.merge( entity.events(entity, Events.FlipBonus), {
      rotationSinceAcceleration: 0
    })

// inBoundsX :: (Phaser.State, Entity) -> Entity
const inBoundsX = c_(
  (stage, entity) => entity.position.x > 0 && entity.position.x < stage.game.width
)
const inBoundsY = c_(
  (stage, entity) => entity.position.y > 0
)

// Accelerate :: Phaser.State -> Spaceship -> Spaceship
export const Accelerate = stage => entity => _.merge(entity, {
  animation: "boost",
  rotationSinceAcceleration: 0,
  velocity: V2.fromAngle(entity.angle)
    |> V2.multiply(-entity.state.thrustSpeed * _.delta(stage.game))
    |> V2.add(entity.velocity)
})

// StopAccelerating :: Spaceship -> Spaceship
export const StopAccelerating = entity => _.merge(entity, {
  animation: null
})

// Rotate :: (Phaser.State, Int, Spaceship) -> Spaceship
export const Rotate = c_(
  (stage, dir, entity) => {
    const rotation = dir * entity.state.rotateSpeed * _.delta(stage.game)
    return _.merge(entity, {
      angle: entity.angle + rotation,
      rotationSinceAcceleration: entity.rotationSinceAcceleration + rotation
    })
  }
)

// Boost :: (Phaser.State, Entity) -> Entity
export const Boost = c_(
  (stage, entity) => {
    Audio.play("boost")

    return _.merge(entity.events(entity, Events.Boost), 
      {
        velocity: V2.fromAngle(entity.angle)
          |> V2.multiply(-entity.state.thrustSpeed * 25 * _.delta(stage.game))
          |> V2.add(entity.velocity)
      }
    )
  }
)

export const Create = () => Entity.model({
    state: {
      thrustSpeed: 400,
      rotateSpeed: 270,
      rotationSinceAcceleration: 0
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

    // Physics
    physicsEnabled: true,
    bodyRadius: 8,
    collisionGroup: Physics.CollisionGroups.Spaceship,
    collisions: collisions(),
    gravity: true,

    update
  })