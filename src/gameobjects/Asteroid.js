import { c_ } from '@/utils/functional'
import * as _ from '@/utils'
import * as Entity from '@/core/Entity'
import * as V2 from '@/utils/Vector2'
import * as Physics from '@/core/Physics'
import * as Stage from '@/core/Stage'

export const Create = (opt={}) => {
  const props = Object.assign({
    // methods
    create  : create,
    update  : update,
    
    // sprite
    asset       : 'spritesheet',
    frame       : 0,

    // Physics
    physicsEnabled  : true,
    bodyRadius      : 8,
    collisionGroup  : Physics.CollisionGroups.Asteroid
  }, opt)

  return new Entity.Entity(props)
}

Stage.register("Asteroid", Create)

// randomize :: () -> Object
export const randomize = stage => {
  const position = rndOffScreenPosition(stage)
  return {
    position,
    velocity: V2.toTarget( position, randomTarget(stage) ) 
      |> V2.multiply( _.rnd(50, 150) ),
    frame: _.rnd(0, 6),
    angle: _.rnd(0, 359),
    angVelocity: _.rnd(-270, 270)
  }
}

const create = entity => {
  Stage.create("AsteroidMarker", { follow: entity }) |> Stage.addEntity(entity.stage)
}

// update :: (Phaser.State, Entity) -> Entity
const update = entity => 
  Physics.outOfBounds(entity, 100)
    ? Entity.die(entity)
    : entity

// randomTarget :: Phaser.State -> Vector2
// Creates a random Vector near the center of the stage for the asteroid to accelerate to
const randomTarget = stage => 
  Stage.centerPosition(stage.game.world) 
    |> randomizePoint(400, 180)

// randomizePoint :: (Int, Vector2) -> Vector2
// Randomizes a vector by a certain amount
const randomizePoint = c_(
  (x, y, v) => ({
    x: _.fluff(v.x, x),
    y: _.fluff(v.y, y)
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
      0: { x: -64, y: v.y },
      1: { x: stage.game.width + 64, y:v.y },
      2: { x: v.x, y: -64 },
      3: { x: v.x, y: stage.game.height + 64 }
    }))

// rndOffScreenPosition :: Phaser.State -> Vector2
// Returns a random position anywhere out of screen
const rndOffScreenPosition = stage => 
  _.rnd(0, 4)
    |> _.findInObject( offScreenPositions(stage) )
    |> (res => res.getOrElse({x: 0, y: 0}))