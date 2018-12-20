import { c_ } from '@/utils/functional'
import * as _ from '@/utils'
import * as Entity from '@/core/Entity'
import * as V2 from '@/utils/Vector2'
import * as Physics from '@/core/Physics'
import * as Stage from '@/core/Stage'

export const Create = (opt={}) => {
  const props = Object.assign({
    // methods
    update  : update,
    
    // sprite
    asset       : 'spritesheet',
    frame       : 0,
    animations  : {
      play      : {
        frames  : [8, 9, 10, 11, 12, 13],
        loop    : true,
        fps     : 10
      }
    },
    animation   : 'play',

    // Physics
    physicsEnabled  : true,
    bodyRadius      : 8,
    collisionGroup  : Physics.CollisionGroups.Pickup
  }, opt)

  return new Entity.Entity(props)
}

Stage.register("Pickup", Create)

// randomize :: () -> Object
export const randomize = stage => {
  const position = rndOffScreenPosition(stage)
  return {
    position,
    velocity: V2.toTarget( position, randomTarget(stage) ) 
      |> V2.multiply(100)
  }
}

// update :: (Phaser.State, Entity) -> Entity
const update = entity => 
  Physics.outOfBounds(entity)
    ? Entity.die(entity)
    : entity

// randomTarget :: Phaser.State -> Vector2
// Creates a random Vector near the center of the stage for the asteroid to accelerate to
const randomTarget = stage => 
  Stage.centerPosition(stage.game.world) 
    |> randomizePoint(200)

// randomizePoint :: (Int, Vector2) -> Vector2
// Randomizes a vector by a certain amount
const randomizePoint = c_(
  (amt, v) => ({
    x: _.fluff(v.x, amt),
    y: _.fluff(v.y, amt)
  })
)

// randomPosition :: Phaser.State -> Vector2
// Gts a random position anywhere in the stage
const randomPosition = stage => ({
  x: _.rnd(0, stage.game.width),
  y: _.rnd(0, stage.game.height)
})

// offScreenPosition :: Phaser.State -> Map(Int, Vector2)
// Creates a random positions for up, down, left and right
const offScreenPositions = stage => 
  randomPosition(stage)
    |> (v => ({
      0: { x: -32, y: v.y },
      1: { x: stage.game.width + 32, y:v.y },
      2: { x: v.x, y: -32 },
      3: { x: v.x, y: stage.game.height + 32 }
    }))

// rndOffScreenPosition :: Phaser.State -> Vector2
// Returns a random position anywhere out of screen
const rndOffScreenPosition = stage => 
  _.rnd(0, 4)
    |> _.findInObject( offScreenPositions(stage) )
    |> (res => res.getOrElse({x: 0, y: 0}))