import { SpriteObject } from '@/core/SpriteObject'
import { c_, State, pipe } from '@/utils/functional'
import * as _ from '@/utils'
import * as Entity from '@/models/Entity'
import * as V2 from '@/utils/Vector2'
import * as Physics from '@/core/Physics'
import * as Stage from '@/core/Stage'
import * as Timer from '@/models/Timer'

export const Create = () =>
  Entity.model({
    alive: true,

    // sprite
    asset: 'spritesheet',
    frame: 0,
    animations: {},
    angle: 0,

    // Physics
    physicsEnabled: true,
    bodyRadius: 8,
    collisionGroup: Physics.CollisionGroups.Asteroid,

    update: update
  })

/*
  create :: (Phaser.State, Object) -> Entity
*/
export const create = c_(
  (stage, props) => {
    const position = rndOffScreenPosition(stage)

    return _.merge(Create(), {
      position,
      velocity: V2.toTarget( position, randomTarget(stage) ) |> V2.multiply( _.rnd(50, 150) ),
      frame: _.rnd(0, 4),
      angle: _.rnd(0, 359),
      angVelocity: _.rnd(-180, 180)
    })
  }
)

/*
  update :: (Phaser.State, Entity) -> Entity
*/
const update = c_(
  (stage, entity) => outOfBounds(stage, entity)
    ? Entity.die(entity)
    : entity
)

/*
  randomTarget :: Phaser.State -> Vector2
  Creates a random Vector near the center of the stage for the asteroid to accelerate to
*/
const randomTarget = stage => Stage.centerPosition(stage.game.world) |> randomizePoint(400)

/*
  randomizePoint :: (Int, Vector2) -> Vector2
  Randomizes a vector by a certain amount
*/
const randomizePoint = c_(
  (amt, v) => ({
    x: _.fluff(v.x, amt),
    y: _.fluff(v.y, amt)
  })
)

/*
  randomPosition :: Phaser.State -> Vector2
  Gts a random position anywhere in the stage
*/
const randomPosition = stage => ({
  x: _.rnd(0, stage.game.width),
  y: _.rnd(0, stage.game.height)
})

/*
  offScreenPosition :: Phaser.State -> Map(Int, Vector2)
  Creates a random positions for up, down, left and right
*/
const offScreenPositions = stage => 
  randomPosition(stage)
    |> (v => ({
      0: { x: -32, y: v.y },
      1: { x: stage.game.width + 32, y:v.y },
      2: { x: v.x, y: -32 },
      3: { x: v.x, y: stage.game.height + 32 }
    }))

/*
    rndOffScreenPosition :: Phaser.State -> Vector2
    Returns a random position anywhere out of screen
*/
const rndOffScreenPosition = c_(
  stage => _.rnd(0, 4)
    |> _.findInObject( offScreenPositions(stage) )
    |> (res => res.getOrElse({x: 0, y: 0}))
)

/*
  outOfBounds :: (Phaser.State, Entity) -> Boolean
*/
export const outOfBounds = c_(
  (stage, entity) =>  entity.position.x < -50 
    || entity.position.x > stage.game.width + 50
    || entity.position.y < -50 
    || entity.position.y > stage.game.height + 50
)

export const spawnTimer = c_(
  (stage, timeFn) => Timer.model({
    count	: timeFn,
    loop	: true,
    done	: () => create(stage, {}) |> Stage.addEntity(stage)
  })
)