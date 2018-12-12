import { c_, pipe } from '@/utils/functional'
import { Asteroid } from '@/gameobjects/Asteroid'
import { randomBetween } from '../utils';

/* 
  createAsteroid :: (Phaser.Game, T<GameObject>, Object) -> Asteroid
*/
export const createObject = c_(
    (state, T, options) => {
        const obj = new T(state, options)
        return obj
    }
)

/* 
  addToScene :: (Phaser.Game, GameObject) -> GameObject
  Adds a GameObject to the stage
*/
export const addToScene = c_(
    (game, gameobject) => {
        game.add.existing(gameobject.sprite)
        return gameobject
    }
)

/* 
  updateEntities :: [Entity] -> null
*/
export const updateEntities = c_(
    (entities) => entities.forEach(
        entity => entity.update && entity.update()
    )
)

/* 
  addToGroup :: (Group, Entity) -> Gameobject
*/
export const addToGroup = c_(
    (group, entity) => {
        // todo: add groups
        return entity
    }
)