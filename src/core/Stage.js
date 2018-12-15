import {c_,pipe} from '@/utils/functional'
import {SpriteObject} from '@/core/SpriteObject'
import * as _ from '../utils'

/* 
  createSprite :: (Phaser.Game, Object) -> SpriteObject
*/
export const createSprite = c_(
	(game, props) => new SpriteObject(game, props)
)

/* 
  addToScene :: (Phaser.Game, GameObject) -> GameObject
  Adds a GameObject to the stage
*/
export const addToScene = c_(
	(game, sprite) => {
		game.add.existing(sprite)
		return sprite
	}
)

/* 
  updateEntities :: [Entity] -> null
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
  addToGroup :: (Group, SpriteObject) -> SpriteObject
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

export const spawn = c_(
	(stage, props) =>
	pipe(
		createSprite(stage.game),
		addToScene(stage.game),
		addToGroup(stage)
	)(props)
)

export const spawnNew = c_(
	(stage, props) => {
		console.log("spawn new")
		const sprite = spawn(stage, props)
		stage.sprites[sprite.id] = sprite
		props.spriteId = sprite.id
		return props
	}
)

export const centerPosition = world => ({
	x: world.centerX,
	y: world.centerY
})

export const addObject = c_(
	(stage, obj) => {
		const spawnObjects = _.push(
			stage.state.spawnObjects,
			obj
		)	

		stage.state.$commit({ spawnObjects })
		return obj
	}
)