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
  stage.$refs = {}
  stage.$state = new State(GameState.model(options))
  stage.$groups = new Groups(
    stage.game, 
    ["default", ...Object.values(Physics.CollisionGroups)]
  )
  Audio.loadConfig(stage)
  window.sg = stage // * debug
}

/*
  Create the player and start the game timers
*/
const create = stage => {
  stage.$refs.score = stage.game.add.text(20, 20, 0, Styles.Score)
  stage.$refs.bonus = stage.game.add.text(20, 46, 0, Styles.Bonus)
  Spaceship.create(stage, PlayerEvents()) |> Stage.addEntity(stage)
  Audio.loop("gameOST")
}

const start = stage => {
  stage.$state.timers = 
    Asteroid.spawnTimer(stage, () => getAsteroidSpeed(stage)) 
      |> _.push(stage.$state.timers)
  
  stage.$state.$commit({ started: true })
}

/*
  Get next state and commit
*/
const update = (stage, state) => {
  if (stage.$state.end) {
    Input.onKeyDown(Input.Keys.Restart, () => restartStage(stage), {})
  }

  if (!stage.$state.started) {
    Input.onKeyAny(() => start(stage), {})
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
  if (state.started) {

    state.gameObjects = updateEntities(stage, state.gameObjects)

    state.elapsedTime = !state.end ? state.elapsedTime + _.delta(stage.game, 1) : state.elapsedTime
    state.score = !state.end ? addScore(stage) : state.score

    state.timers = Timer.updateAll(stage)(state.timers)
  }

  state.gameObjects = spawnEntities(stage, state.spawnQueue) 
    |> _.concat(state.gameObjects)
  state.spawnQueue = []

  return state
}

const addScore = ({$state, game}) => $state.score + _.delta(game, 1)*$state.elapsedTime*(getBonus($state) + 1)

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
  const bonus = getBonus(stage.$state)
  stage.$refs.score.text = getScoreString(stage)
  stage.$refs.bonus.text = toBonusString(bonus)
  if (bonus < 10) {
    stage.$refs.bonus.addColor("#666", 0)
  } else if (bonus < 15) {
    stage.$refs.bonus.addColor("#20381a", 0)
  } else if (bonus < 19) {
    stage.$refs.bonus.addColor("#48ce27", 0)
  } else {
    stage.$refs.bonus.addColor("#e51ee9", 0)
  }
}

const getBonus = state => _.toLerp(100, 400, state.playerVelocity) |> _.lerp(0, SPEED_BONUS)
const restartStage = stage => stage.state.start('Game')
const toBonusString = bonus => 'x' + Math.floor(bonus)
const getScoreString = stage => Math.floor(stage.$state.score) |> _.numberCommas

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
    showFinalScore(stage)
  }
})

const getAsteroidSpeed = stage => _.toLerp(0, 60, stage.$state.elapsedTime)  |> _.ilerp(1, 0.15)

const showEndText = c_(
  (stage, style, y, text) => {
    const textSprite = stage.game.add.text(0, y, text, style)
    textSprite.setTextBounds(0, 0, stage.game.width, 100)
  }
)

const slamUI = stage => {
  Audio.play("boost")
  stage.game.camera.shake(0.04, 120)
}

const endTitleTimer = stage => Timer.model({
  count	: () => 1500 / 1000,
  done	: () => {
    slamUI(stage)
    showEndText(stage, Styles.scoreTitle, 50,  "SCORE")
  }
})

const endScoreTimer = stage => Timer.model({
  count	: () => 2000 / 1000,
  done	: () => {
    slamUI(stage)
    getScoreString(stage) |> showEndText(stage, Styles.scoreText, 86)
  }
})

const endStatsTimer = stage => Timer.model({
  count	: () => 2500 / 1000,
  done	: () => showEndStats(stage)
})

const showEndStats = c_(
  (stage) => {
    showEndText(stage, Styles.restartText, 140, "Press [F] to restart")
    statElement(stage, -140, "JUMPS", stage.$state.jumps)
    statElement(stage, 0, "TIME", mmss(stage.$state.elapsedTime))
    statElement(stage, 140, "FLIPS", stage.$state.flips)
  }
)

const padZero = val => (val < 10) ? '0' + val : val

const mmss = seconds => {
	const minutes = Math.floor(seconds / 60)
	seconds = Math.floor(seconds % 60)
	return `${padZero(minutes)}:${padZero(seconds)}`
}

const statElement = (stage, offsetX, name, val) => {
  const width = 100
  const titleSprite = stage.game.add.text(0, 0, name, Styles.statTitle)
  titleSprite.setTextBounds(
    stage.game.world.centerX + offsetX - (width/2), 
    210,
    width, 
    100
  )
  const detailSprite = stage.game.add.text(0, 0, val, Styles.statDetail)
  detailSprite.setTextBounds(
    stage.game.world.centerX + offsetX - (width/2), 
    180,
    width, 
    100
  )
}

const showFinalScore = stage => {
  stage.$state.timers = _.concat(
    stage.$state.timers, 
    [endTitleTimer(stage), endScoreTimer(stage), endStatsTimer(stage)]
  )
}

// Need to use function instead of arrows so we don't scope it to window lol
export const Game = { 
  init    : function(options={}) { init(this, options) }, 
  create  : function() { create(this, this.$state) }, 
  update  : function() { update(this, this.$state) }
}