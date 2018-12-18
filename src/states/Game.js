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

const SPEED_BONUS = 20


/*
  Initialize references 
*/
const init = (stage, options) => {
  stage.refs = {}
  stage._state = new State(GameState.model(options))
  console.log("INIT STATE", stage._state)
  stage.groups = new Groups(stage.game, _.concat(["default"], Object.values(Physics.CollisionGroups)))
  Audio.loadConfig(stage)
  window.sg = stage // * debug
}

/*
  Create the player and start the game timers
*/
const create = stage => {
  stage.refs.score = stage.game.add.text(20, 20, 0, Styles.Score)
  stage.refs.bonus = stage.game.add.text(20, 46, 0, Styles.Bonus)
  Spaceship.create(stage, PlayerEvents()) |> Stage.addEntity(stage)
  
  stage._state.timers = Asteroid.spawnTimer(stage, () => getAsteroidSpeed(stage)) 
    |> _.push(stage._state.timers)

  // Asteroid.spawnTimer(stage, () => {
  //   const time = _.toLerp(1, 250000, stage._state.score)  
  //     |> _.ilerp(2, 0.4)
  //   return time
  // }) |> stage._state.timers.push

  Audio.loop("gameOST")
  // Asteroid.spawnTimer(stage, () => 0.35) |> stage._state.timers.push
}

/*
  Get next state and commit
*/
const update = (stage, state) => {
  if (stage._state.end) {
    Input.onKeyDown(Input.Keys.Restart, () => { console.log("PRESS F"); restartStage(stage)}, {})
  }

  nextState(stage, state) |> state.$commit
  Input.clear()
  updateUI(stage)
}

/*
  nextState :: (Phaser.State, GameState) -> GameState
*/
const nextState = (stage, state) => {
  // Game objects need to be updated first, and then the spawn queue
  // needs to be done after for any entity that spawned something mid-update
  state.elapsedTime = !state.end ? state.elapsedTime + _.delta(stage.game, 1) : state.elapsedTime

  state.gameObjects = updateEntities(stage)(state.gameObjects)
  state.timers = Timer.updateAll(stage)(state.timers)
  state.gameObjects = spawnEntities(stage, state.spawnQueue)
    |> _.concat(state.gameObjects)
  state.spawnQueue = []
  state.score = !state.end ? addScore(stage) : state.score

  return state
}

const getBonus = state => _.toLerp(100, 400, state.playerVelocity) |> _.lerp(0, SPEED_BONUS)

const addScore = ({_state, game}) => {
  return _state.score + _.delta(game, 1)*_state.elapsedTime*(getBonus(_state) + 1)
}

/*
  spawnEntities :: (Phaser.State, [Entity]) -> [Entity]
*/
const spawnEntities = c_(
  (stage, entities) => entities 
    |> _.filter( n => !n.sprite )
    |> _.map( n => Stage.spawn(stage, n))
)

/*
  updateObjects :: Phaser.State -> [Entity] -> [Entity]
*/
const updateEntities = c_(
  (stage, entities) => entities
    |> _.map(updateEntity(stage))
    |> _.filter(Entity.dead)
)

/*
  updateObject :: Phaser.State -> Entity -> Entity
*/
const updateEntity = c_(
  (stage, entity) => entity
    |> _.has("physicsEnabled") (Physics.apply(_.delta(stage.game)))
    |> _.has("update") (e => e.update(stage, e))
    |> _.has("events") (fireSpriteEvents)
    |>  _.has("physicsEnabled") (Physics.testCollisions(stage))
    |> commitToSprite
)

const updateUI = stage => {
  stage.refs.score.text = Math.floor(stage._state.score) |> _.numberCommas
  const bonus = getBonus(stage._state) |> _.round
  stage.refs.bonus.text = 'x' + bonus
}

const restartStage = stage => stage.state.start('Game')

const getScore = stage => Math.pow(3*stage._state.elapsedTime, 2)

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

const PlayerEvents = () => ({
  [Spaceship.Events.Die]: (stage, entity) => {
    Audio.stop("gameOST")
    showScore(stage)
  }
})

const getAsteroidSpeed = stage => _.toLerp(0, 60, stage._state.elapsedTime)  |> _.ilerp(1, 0.15)

const showScore = async (stage) => {
  await _.wait(1500)
  stage.game.camera.shake(0.04, 120)
  Audio.play("boost")
  const title = stage.game.add.text(0, 100, "SCORE", Styles.scoreTitle)
  title.setTextBounds(0, 0, stage.game.width, 100)

  await _.wait(500)
  stage.game.camera.shake(0.04, 120)
  Audio.play("boost")
  const score = stage.game.add.text(0, 136, Math.floor(stage._state.score) |> _.numberCommas, Styles.scoreText)
  score.setTextBounds(0, 0, stage.game.width, 100)

  await _.wait(500)
  const restart = stage.game.add.text(0, 200, "Press F to restart", Styles.restartText)
  restart.setTextBounds(0, 0, stage.game.width, 100)
}

// Need to use function instead of arrows so we don't scope it to window lol
export const Game = { 
  init    : function(options={}) { init(this, options) }, 
  create  : function() { create(this, this._state) }, 
  update  : function() { update(this, this._state) }
}