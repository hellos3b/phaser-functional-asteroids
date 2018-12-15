/* globals __DEV__ */
import Phaser from 'phaser'
import * as Stage from '@/core/Stage'
import * as _ from '@/utils'
import { Timer } from '@/core/Timer'
import { Groups } from '@/core/Groups'
import { State, pipe, stream, log } from '@/utils/functional'

import { Asteroid } from '@/gameobjects/Asteroid'
import { Spaceship } from '@/gameobjects/Spaceship'
import { Boost } from '@/gameobjects/Boost'

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
  timers      : []
})

/*
  nextState :: (Physics.State, State) -> State
*/
const nextState = (stage, state) => ({
    config: state.config,
    state: state.state,
    gameObjects: updateEntities(stage, state.gameObjects),
    timers: []
})

/*
  updateObject :: Physics.State -> Entity -> Entity
*/
const updateEntity = stage => entity => 
  pipe(
    _.no("spriteId")(Stage.spawnNew(stage)),
    _.has("physicsEnabled")(Physics.apply(_.delta(stage.game)))
  )(entity)

/*
  updateObjects :: (Physics.State, [Entity]) -> [Entity]
*/
const updateEntities = (stage, entities) => 
  _.map(updateEntity(stage), entities) 

/*
  commitToSprite :: ([Sprite], Entity) => null
*/
const commitToSprite = c_(
  (sprites, obj) => sprites[obj.spriteId].commit(obj)
)

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
}

/*
  Create the player and start the game timers
*/
const create = (stage, state) => {
  let { gameObjects } = state

  const player = _.deepMerge(Spaceship(), {
     position: Stage.centerPosition(stage.world)
  })

  gameObjects = _.push(gameObjects, player)
  state.$commit({ gameObjects })
}

/*
  Get next state and commit
*/
const update = (stage, state) => {
  state.$commit(nextState(stage, state))
  _.each(commitToSprite(stage.sprites), state.gameObjects)
}

export const Game = { 
  init    : function (options={}) { init(this, options) }, 
  create  : function() { create(this, this.state) }, 
  update  : function() { update(this, this.state) }
}