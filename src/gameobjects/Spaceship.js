import * as _ from '@/utils'
import * as Physics from '@/core/Physics'
import * as V2 from '@/utils/Vector2'
import * as EventManager from '@/core/Events'
import * as Stage from '@/core/Stage'
import * as Input from '@/core/Input'
import * as BoostEntity from '@/gameobjects/Boost'
import * as FlipEntity from '@/gameobjects/FlipEffect'
import * as ExplodeEntity from '@/gameobjects/Explosion'
import * as Audio from '@/core/Audio'
import * as VelocityEffect from '@/gameobjects/VelocityEffect'
import * as Entity from '@/core/Entity'

const MAX_VELOCITY = 400
const VELOCITY_EFFECT = 380
const BOOST_OFFSET = 16

export const Events = {
  Boost: "boost",
  Die: "died"
}

const collisions = () => ({
  [Physics.CollisionGroups.Asteroid]: onCollideAsteroid
})

export const Create = (opt={}) => {
  // so events can be merged instead of overwritten
  const events = {
    [Events.Boost]: onBoost,
    [Events.FlipBonus]: onFlipBonus,
    ...(opt.events || {})
  }

  const props = Object.assign({
    thrustSpeed : 400,
    rotateSpeed : 270,
    flipRotation: 0,

    // methods
    update  : update,
    input   : inputController,
    
    // sprite
    asset       : 'spaceship',
    frame       : 0,
    animations  : {
      boost     : {
        frames  : [1, 2, 3, 4],
        loop    : true,
        fps     : 10
      }
    },

    // Physics
    physicsEnabled  : true,
    bodyRadius      : 8,
    collisionGroup  : Physics.CollisionGroups.Player,
    collisions      : collisions(),
    gravity         : true,
  }, opt, { events })

  return new Entity.Entity(props)
}

Stage.register("Spaceship", Create)

// update :: Spaceship -> Spaceship
const update = entity => entity.input(entity) 
  |> Physics.bounceWalls
  |> Physics.bounceOffCeiling
  |> Physics.clampVelocity(MAX_VELOCITY)
  |> dieIfGrounded
  |> checkFlipBonus
  |> checkVelocityEffect
  // |> updateGameVelocity(stage)

/*
  Input
  ----------
*/

// Input :: (Phaser.State, Spaceship) -> Spaceship
const inputController = entity => {
  const { keyDown, onKeyUp, onKeyDown, Keys} = Input

  return entity
    |> keyDown(Keys.Accelerate, Accelerate)
    |> onKeyUp(Keys.Accelerate, StopAccelerating)
    |> keyDown(Keys.RotateRight,Rotate(1))
    |> keyDown(Keys.RotateLeft, Rotate(-1))
    |> onKeyDown(Keys.Boost, Boost)
}

// Accelerate :: Phaser.State -> Spaceship -> Spaceship
export const Accelerate = entity => entity.$commit({
  animation: "boost",
  flipRotation: 0,
  velocity: V2.fromAngle(entity.angle)
    |> V2.multiply(-entity.thrustSpeed * _.delta(entity.stage.game))
    |> V2.add(entity.velocity)
})

// StopAccelerating :: Spaceship -> Spaceship
export const StopAccelerating = entity => 
  entity.$commit({ animation: null })

// Rotate :: (Phaser.State, Int, Spaceship) -> Spaceship
export const Rotate = dir => entity => {
  const rotation = dir * entity.rotateSpeed * _.delta(entity.stage.game)
  return entity.$commit({
    angle: entity.angle + rotation,
    flipRotation: ((rotation < 0 && entity.flipRotation < 0) || (rotation > 0 && entity.flipRotation > 0))
        ? entity.flipRotation + rotation
        : rotation
  })
}

// Boost :: (Phaser.State, Entity) -> Entity
export const Boost = entity => {
  entity.stage.$state.$commit({ jumps: entity.stage.$state.jumps + 1})
  Audio.play("boost")
  entity.emit(Events.Boost)

  return entity.$commit({
    velocity: V2.fromAngle(entity.angle)
      |> V2.multiply(-entity.thrustSpeed * 25 * _.delta(entity.stage.game))
      |> V2.add(entity.velocity)
  })
}

/*
   Event Listeners
*/
const onBoost = entity => {
  Stage.create("Boost", { position: getBoostPosition(entity) }) |> Stage.addEntity(entity.stage)
  return entity
}

const onFlipBonus = entity => {
  Stage.create("Flip", { 
    position: entity.position,
    angle: entity.angle 
  }) |> Stage.addEntity(entity.stage)

  // todo: not here tho
  const bonus = _.toLerp(100, 400, V2.magnitude(entity.velocity)) |> _.lerp(0.05, 0.2)

  // todo: can hook in Game?
  entity.stage.$state.$commit({
    score: entity.stage.$state.score + (entity.stage.$state.score*bonus),
    flips: entity.stage.$state.flips + 1
  })
  return entity
}

const onCollideAsteroid = c_(
  (entity, target) => explode(entity)
)

/*

*/
const dieIfGrounded = entity => 
  entity.position.y < entity.stage.game.height 
    ? entity 
    : explode(entity)

const explode = entity => {
  Stage.create("Explosion", { position: entity.position }) |> Stage.addEntity(entity.stage)

  // update states
  entity.emit(Events.Die)
  entity.stage.$state.$commit({ end: true })
  return Entity.die(entity)
}

// checkFlipBonus :: Spaceship -> Spaceship
const checkFlipBonus = entity => 
  gotFlipBonus(entity) 
    ? emitBonus(entity) 
    : entity

// gotFlipBonus :: Spaceship -> Boolean
const gotFlipBonus = entity => Math.abs(entity.flipRotation) >= 360

// emitBonus :: Spaceship -> Spaceship
const emitBonus = entity => {
  entity.emit(Events.FlipBonus)
  return entity.$commit({ flipRotation: 0 })
}

const checkVelocityEffect = entity => {
  if (V2.magnitude(entity.velocity) > VELOCITY_EFFECT) {
    Stage.create("VelocityEffect", { position: entity.position, angle: entity.angle })
      |> Stage.addEntity(entity.stage)
  }
  return entity
} 

const getBoostPosition = entity =>  
  V2.fromAngle(entity.angle)
    |> V2.multiply(BOOST_OFFSET)
    |> V2.add(entity.position)