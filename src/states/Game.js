/* globals __DEV__ */
import Phaser from 'phaser'
import * as Stage from '@/core/Stage'
import * as _ from '@/utils'
import * as Timer from '@/models/Timer'
import { Groups } from '@/core/Groups'
import { State, pipe, stream, log } from '@/utils/functional'

import * as Asteroid from '@/gameobjects/Asteroid'
import * as Spaceship from '@/gameobjects/Spaceship'
import * as Entity from '@/models/Entity'
import { InputStream, PlayerInput } from '@/core/Input'
import * as Boost from '@/gameobjects/Boost'
import * as EventManager from '@/core/Events'

import * as config from '@/config/game'
import * as Physics from '@/core/Physics'
import * as GameState from '@/models/GameState'

/*
  nextState :: (Phaser.State, GameState) -> GameState
*/
const nextState = (stage, state) => ({
    config: state.config,
    state: state.state,
    timers: Timer.updateAll(stage)(state.timers),
    gameObjects: state.state.paused 
      ? state.gameObjects
      : _.concat(
        updateEntities(stage)(state.gameObjects),
        state.spawnQueue
      ),
    spawnQueue: _.filter( n => !n.sprite, state.spawnQueue )
})

/*
  updateObjects :: Phaser.State -> [Entity] -> [Entity]
*/
const updateEntities = c_(
  (stage, entity) => entity
    |> _.map(updateEntity(stage))
    |> _.filter(Entity.dead)
)

/*
  updateObject :: Phaser.State -> Entity -> Entity
*/
const updateEntity = c_(
  (stage, entity) => entity
    |> _.no("sprite") (Stage.spawn(stage))
    |> _.has("physicsEnabled") (Physics.apply(_.delta(stage.game)))
    |> _.has("update") (e => e.update(stage, e))
    |> _.has("events") (fireSpriteEvents)
    |> commitToSprite
)

/*
  commitToSprite :: Entity -> Entity
*/
const fireSpriteEvents = entity => 
  entity.sprite.getEventQueue()
    |> _.map(entity.events(entity))
    |> _.mergeDown
    |> _.mergeIn(entity)

/*
  commitToSprite :: Entity => Entity
*/
const commitToSprite = obj => obj.sprite.commit(obj)


/*
  Initialize references 
*/
const init = (stage, options) => {
  stage.state = new State(GameState.model(options))
  stage.groups = new Groups(
    stage.game, 
    _.concat(["default"], Object.values(Physics.CollisionGroups))
  )
  stage.input = new InputStream()
  window.sg = stage // * debug
}

/*
  Create the player and start the game timers
*/
const create = stage => {
  Spaceship.create(stage) |> Stage.addEntity(stage)
  stage.state.timers.push( 
    _.merge(Timer.model(), {
      count : () => 0.25,
      loop  : true,
      done  : () => Asteroid.create(stage, {}) |> Stage.addEntity(stage)
    }))
  stage.state.timers.push( 
    _.merge(Timer.model(), {
      count : () => 0.35,
      loop  : true,
      done  : () => Asteroid.create(stage, {}) |> Stage.addEntity(stage)
    }))
}

/*
  Get next state and commit
*/
const update = (stage, state) => {
  state.$commit(nextState(stage, state))
  stage.input.clear()
}

// Need to use function instead of arrows so we don't scope it to window lol
export const Game = { 
  init    : function(options={}) { init(this, options) }, 
  create  : function() { create(this, this.state) }, 
  update  : function() { update(this, this.state) }
}