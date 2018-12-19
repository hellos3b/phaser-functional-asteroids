import {c_,pipe} from '@/utils/functional'
import {SpriteObject} from '@/core/SpriteObject'
import * as _ from '../utils'
import { Maybe } from '../utils/functional';

// entities :: Map<String, Entity>
let Entities = {}

export const create = c_(
  (name, options) => 
    Maybe(Entities[name]).getOrThrow(`No Entity found with name: '${name}`)
      |> (apply => apply(options))
)

export const register = c_(
  (name, fn) => Entities[name] = fn
)


/* 
  centerPosition :: Phaser.World -> Object
*/
export const centerPosition = world => ({
  x: world.centerX,
  y: world.centerY
})

// addToScene :: (Phaser.Game, Sprite) -> Sprite
export const addToScene = (game, sprite) => {
  game.add.existing(sprite)
  return sprite
}

// addToGroup :: (Phaser.State, Sprite) -> Sprite
export const addToGroup = (stage, sprite) => {
  const name = sprite.state.group ||
    sprite.state.collisionGroup ||
    "default"

  stage.$groups[name].add(sprite)
  return sprite
}

/* 
  addEntity :: (Phaser.State, Entity) -> Entity
*/
export const addEntity = c_(
  (stage, entity) => {
    entity.$spawn(stage) 

    stage.$state.$commit({ 
      gameObjects: _.push(stage.$state.gameObjects, entity)
    })

    return entity
  }
)