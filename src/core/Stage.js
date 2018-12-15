import {c_,pipe} from '@/utils/functional'
import {SpriteObject} from '@/core/SpriteObject'
import * as _ from '../utils'

/* 
  createSprite :: (Phaser.Game, Entity) -> Sprite
*/
export const createSprite = c_(
	(game, entity) => new SpriteObject(game, entity)
)

/* 
  addToScene :: (Phaser.Game, Sprite) -> Sprite
*/
export const addToScene = c_(
	(game, sprite) => {
		game.add.existing(sprite)
		return sprite
	}
)

/* 
  updateEntities :: [Entity] -> [Entity]
*/
export const updateEntities = entities =>
	entities.map(
		entity => {
			entity.update && entity.update()
			return entity
		}
	).filter(e => e.state.alive)

/* 
  updateTimers :: (Number, [Timers]) -> [Timers]
*/
export const updateTimers = c_(
	(time, timers) => timers.map(
		t => t.addTime(time)
	).filter(t => !t.done())
)

/* 
  addToGroup :: (Phaser.State, Sprite) -> Sprite
*/
export const addToGroup = c_(
	(stage, sprite) => {
		const name = sprite.state.group ||
			sprite.state.collisionGroup ||
			"default"

		stage.groups[name].add(sprite)
		return sprite
	}
)

/* 
  spawn :: (Phaser.State, Entity) -> Entity
*/
export const spawn = c_(
	(stage, entity) => {
		const sprite = pipe(
			createSprite(stage.game),
			addToScene(stage.game),
			addToGroup(stage)
		)(entity)

		return _.merge(entity, { sprite })
	}
)

/* 
  centerPosition :: Phaser.World -> Object
*/
export const centerPosition = world => ({
	x: world.centerX,
	y: world.centerY
})

/* 
  addEntity :: (Phaser.State, Entity) -> Entity
*/
export const addEntity = c_(
	(stage, entity) => {
		const spawnQueue = _.push(
			stage.state.spawnQueue,
			entity
		)	

		stage.state.$commit({ spawnQueue })
		return entity
	}
)