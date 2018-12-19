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
import Entity from '@/core/Entity'

const MAX_VELOCITY = 400

export const Events = {
  Boost: "boost",
  Die: "died"
}

const collisions = () => {}

export const Create = (opt={}) => {
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
  }, opt)

  return new Entity(props)
}

Stage.register("Spaceship", Create)

// update :: (Phaser.State, Spaceship) -> Spaceship
const update = entity => entity.input(entity) 
  |> Physics.bounceWalls
  |> Physics.bounceOffCeiling
  |> Physics.clampVelocity(MAX_VELOCITY)
  // |> checkFlipBonus
  // |> checkVelocityEffect(stage)
  // |> checkBottomCrash(stage)
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
    flipRotation: 
      ((rotation < 0 && entity.flipRotation < 0) || (rotation > 0 && entity.flipRotation > 0))
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