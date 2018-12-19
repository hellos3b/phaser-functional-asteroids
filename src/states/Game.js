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
import * as Boost from '@/gameobjects/Boost'
import * as EventManager from '@/core/Events'
import * as Sounds from '@/config/sounds'
import * as Input from '@/core/Input'
import * as Audio from '@/core/Audio'
import * as Styles from '@/config/styles'

import * as config from '@/config/game'
import * as Physics from '@/core/Physics'
import * as GameState from '@/models/GameState'
import * as Engine from '@/core/Engine'

const SPEED_BONUS = 20

/*
  Initialize references 
*/
const init = (stage, options) => {
  stage.$refs = {}
  stage.$state = new State(GameState.model(options))
  stage.$groups = new Groups(
    stage.game, 
    ["default", ...Object.values(Physics.CollisionGroups)]
  )
  Audio.loadConfig(stage)
  window.sg = stage // * debug
}

const create = stage => {
  stage.$refs.player = Stage.create("Spaceship", {
    position: Stage.centerPosition(stage.world)
  }) |> Stage.addEntity(stage)
}

const update = stage => {
  nextState(stage) |> stage.$state.$commit
  Input.clear()
}

// nextState :: (Phaser.State, GameState) -> GameState
const nextState = stage => {
  // if (state.started) {
    const state = stage.$state

    // Timer.updateAll(stage)(state.timers)
    Engine.updateEntities(stage)

    state.elapsedTime = !state.end ? state.elapsedTime + _.delta(stage.game, 1) : state.elapsedTime
    state.score = !state.end ? addScore(stage) : state.score

    // state.timers = 
  // }

  stage.$state.$commit({
    gameObjects: _.filter(Entity.dead, stage.$state.gameObjects),
    elapsedTime: !state.end ? state.elapsedTime + _.delta(stage.game, 1) : state.elapsedTime,
    score: !state.end ? addScore(stage) : stage.$state.score
  })

  return state
}

const addScore = ({$state, game}) => $state.score + _.delta(game, 1)*$state.elapsedTime*(getBonus($state) + 1)
const getBonus = state => _.toLerp(100, 400, state.playerVelocity) |> _.lerp(0, SPEED_BONUS)

// Need to use function instead of arrows so we don't scope it to window lol
export const Game = { 
  init    : function(options={}) { init(this, options) }, 
  create  : function() { create(this) }, 
  update  : function() { update(this) }
}