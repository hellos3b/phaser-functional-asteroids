/* globals __DEV__ */
import Phaser from 'phaser'
import * as Stage from '@/core/Stage'
import * as _ from '@/utils'
import { Timer } from '@/core/Timer'
import { Groups } from '@/core/Groups'
import { State, pipe, stream, log } from '@/utils/functional'

import { Asteroid } from '@/gameobjects/Asteroid'
import * as Spaceship from '@/gameobjects/Spaceship'
import * as Sprite from '@/core/Sprite'
import { InputStream, PlayerInput } from '@/core/Input'
import * as Boost from '@/gameobjects/Boost'
import * as EventManager from '@/core/Events'

import * as config from '@/config/game'
import * as Physics from '@/core/Physics'
import * as Vector2 from '@/utils/Vector2'
import * as Debug from '@/core/Debug'

const initialState = () => ({
  config: {
    lastAsteroidSpawn : 0,
    asteroidSpawnRate : 0.15,
    physicsStep       : 30 / 1000
  },
  state: {
    bonus       : 0,
    elapsedTime : 1
  },
  gameObjects : [],
  spawnObjects: [],
  timers      : []
})

/*
  nextState :: (Phaser.State, State) -> State
*/
const nextState = (stage, state) => ({
    config: state.config,
    state: state.state,
    gameObjects: _.concat(
      updateEntities(stage, state.gameObjects),
      state.spawnObjects
    ),
    spawnObjects: [],
    timers: []
})

/*
  updateObject :: Phaser.State -> Entity -> Entity
*/
const updateEntity = stage => entity => 
  pipe(
    _.no("spriteId")(Stage.spawnNew(stage)),
    _.has("physicsEnabled")(Physics.apply(_.delta(stage.game))),
    _.has("input")(e => e.input(e)),
    concatSpriteEvents(stage.sprites),
    _.length("emit")(EventManager.emit),
    commitToSprite(stage.sprites)
  )(entity)

/*
  commitToSprite :: ([Sprite], Entity) => Object
*/
const concatSpriteEvents = c_(
  (sprites, obj) => _.merge(obj, {
    emit: _.concat(
      sprites[obj.spriteId].emit || [],
      obj.emit || []
    )
  })
)

/*
  updateObjects :: (Phaser.State, [Entity]) -> [Entity]
*/
const updateEntities = (stage, entities) => 
  pipe(
    _.map(updateEntity(stage)),
    _.filter(Sprite.dead),
  )(entities)

/*
  commitToSprite :: ([Sprite], Entity) => Object
*/
const commitToSprite = c_(
  (sprites, obj) => {
    sprites[obj.spriteId].commit(obj)
    return obj
  }
)

// todo: maybe move to Spaceship ?
/*
  playerEvents :: () -> Object(string, function) -> Entity
*/
const PlayerEvents = () => ({
  [Spaceship.Events.Boost]: (stage, entity) => {
    Stage.addObject(stage, Boost.create(stage, entity))
    stage.game.camera.shake(0.01, 60)
    return entity
  }
})

/*
  Initialize references (can't go without 'em)
*/
const init = (stage, options) => {
  stage.sprites = {}
  stage.state = new State(_.merge(initialState(), options))
  stage.groups = new Groups(stage.game, [
    "default",
    ...Object.values(Physics.CollisionGroups)
  ])
  stage.input = new InputStream()
  window.sg = stage
}

// todo: move player json to Spaceship? (similar to boost)
/*
  Create the player and start the game timers
*/
const create = (stage, state) => {
  let { gameObjects } = state

  const player = _.merge(Spaceship.Entity(), {
     position: Stage.centerPosition(stage.world),
     input: PlayerInput(stage),
     events: EventManager.Events(stage, PlayerEvents())
  })

  gameObjects = _.push(gameObjects, player)
  state.$commit({ gameObjects })
}

/*
  Get next state and commit
*/
const update = (stage, state) => {
  state.$commit(nextState(stage, state))
  stage.input.clear()
}

export const Game = { 
  init    : function (options={}) { init(this, options) }, 
  create  : function() { create(this, this.state) }, 
  update  : function() { update(this, this.state) }
}