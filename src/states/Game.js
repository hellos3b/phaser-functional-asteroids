/* globals __DEV__ */
import Phaser from 'phaser'
import * as Stage from '@/core/Stage'
import * as _ from '@/utils'
import * as Timer from '@/models/Timer'
import { Groups } from '@/core/Groups'
import { State, pipe, stream, log } from '@/utils/functional'

import '@/gameobjects/AsteroidMarker'
import * as Asteroid from '@/gameobjects/Asteroid'
import * as Pickup from '@/gameobjects/Pickup'
import * as Spaceship from '@/gameobjects/Spaceship'
import * as Entity from '@/core/Entity'
import * as Boost from '@/gameobjects/Boost'
import * as EventManager from '@/core/Events'
import * as Sounds from '@/config/sounds'
import * as Input from '@/core/Input'
import * as Audio from '@/core/Audio'
import * as Styles from '@/config/styles'

import * as config from '@/config/game'
import * as Physics from '@/core/Physics'
import * as GameState from '@/models/GameState'
import * as UI from '@/game/UI'

const SPEED_BONUS = 20

const States = {
  BEGIN : "begin",
  GAME  : "game",
  END   : "end"
}

/*
  Initialize references 
*/
const init = (stage, options) => {
  stage.stage.backgroundColor = config.BACKGROUND_COLOR
  stage.$refs = {}
  stage.$state = new State(GameState.model(options))
  stage.$state.timers = []
  stage.$groups = new Groups(
    stage.game, 
    ["default", ...Object.values(Physics.CollisionGroups)]
  )
  Audio.loadConfig(stage)
  window.sg = stage // * debug
}

const create = stage => {
  document.querySelector('.leaderboard-container').innerHTML = ''
  stage.$refs.player = Stage.create("Spaceship", {
    position: Stage.centerPosition(stage.world),
    events: {  
      [Spaceship.Events.Die]: onPlayerDie
    }
  }) |> Stage.addEntity(stage)

  UI.create(stage)

  start(stage)
}

const start = stage => {
  Audio.loop("gameOST")
  startAsteroidTimer(stage)
  stage.$state.$commit({
    startTime: new Date().toISOString()
  })
  // startPickupTimer(stage)
}

const update = stage => {
  if (stage.$state.end) {
    Input.onKeyDown(Input.Keys.Restart, () => restartStage(stage), {})
  }

  nextState(stage) |> stage.$state.$commit
  Input.clear()
  UI.update(stage)
}

// nextState :: (Phaser.State, GameState) -> GameState
const nextState = stage => {
  const state = stage.$state

  Timer.updateAll(stage)(stage.$state.timers)
  updateEntities(stage)

  stage.$state.$commit({
    gameObjects: _.filter(Entity.stillAlive, state.gameObjects),
    elapsedTime: !state.end ? state.elapsedTime + _.delta(stage.game, 1) : state.elapsedTime,
    score: !state.end ? addScore(stage) : state.score
  })

  return state
}

// updateEntities :: Phaser.State -> None
const updateEntities = stage => 
  stage.$state.gameObjects
    |> _.filter(Entity.spawned)
    |> _.each(updateEntity)

// updateEntity :: Entity -> Entity
const updateEntity = entity => entity
  |> (e => e.update(e))
  |> _.has("physicsEnabled") (Physics.apply(_.delta(entity.stage.game)))
  |> _.has("physicsEnabled") (Physics.testCollisions)
  |> Entity.commitToSprite

// startAsteroidTimer :: Phaser.State -> None
const startAsteroidTimer = stage => {
  Timer.create({
    count : () => getAsteroidRate(stage),
    loop  : true,
    done  : () => createAsteroid(stage)
  }) |> Stage.addTimer(stage)
}

const startPickupTimer = stage => {
  Timer.create({
    count : () => 2,
    loop  : true,
    done  : () => createPickup(stage)
  }) |> Stage.addTimer(stage)
}

// createAsteroid :: Phaser.State -> None
const createPickup = stage => {
  Stage.create("Pickup", Pickup.randomize(stage))
    |> Stage.addEntity(stage)
}

// createAsteroid :: Phaser.State -> None
const createAsteroid = stage => {
  Stage.create("Asteroid", Asteroid.randomize(stage))
    |> Stage.addEntity(stage)
}

// getAsteroidRate :: Phaser.State -> float
// Returns in ms how often an asteroid should spawn (based on elapsed time)
const getAsteroidRate = stage => 
  _.toLerp(0, 120, stage.$state.elapsedTime)  
    |> _.ilerp(1.4, 0.15)

const onPlayerDie = entity => {
  Audio.stop("gameOST")
  entity.stage.$state.$commit({
    end: true,
    endTime: new Date().toISOString()
  })
  UI.showFinalScore(entity.stage)
}

const addScore = stage => 
  stage.$state.score
    + (stage.$state.flips + 1)
    * (UI.getCurrentBonus(stage) + 1)
    * _.delta(stage.game) 

const restartStage = stage => stage.state.start('Game')

// Need to use function instead of arrows so we don't scope it to window lol
export const Game = { 
  init    : function(options={}) { init(this, options) }, 
  create  : function() { create(this) }, 
  update  : function() { update(this) }
}