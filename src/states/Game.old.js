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
  entities    : [],
  timers      : [],
  lastAsteroidSpawn: 0,
  asteroidSpawnRate: 0.15,
  physicsStep : 30 / 1000,
  score       : 0,
  elapsedTime : 1
})

const asteroidTarget = c_(
  (gameWidth, gameHeight) => ({
    x: _.fluff(gameWidth/2, 300),
    y: _.fluff(gameHeight/2, 300)
  })
)

const createAsteroidProps = c_(
  (gameWidth, gameHeight) => {
    const position = rngOffScreenPosition(gameWidth, gameHeight)
    return {
      position: position,
      speed: _.randomBetween(50, 150),
      velocity: pipe(
        () => asteroidTarget(gameWidth, gameHeight),
        Vector2.toTarget(position),
        Vector2.multiply(_.randomBetween(100, 200))
      )(),
      frame: _.randomBetween(0, 4),
      angle: _.randomBetween(0, 359),
      rotateSpeed: _.randomBetween(-180, 180)
    }
  }
)

const generateOffScreenPositions = c_(
  (gameWidth, gameHeight) => {
    const randomX = _.randomBetween(0, gameWidth)
    const randomY = _.randomBetween(0, gameHeight)
    return {
      0: { x: -32, y: randomY },
      1: { x: gameWidth + 32, y:randomY },
      2: { x: randomX, y: -32 },
      3: { x: randomX, y: gameHeight + 32 }
    }     
  }
)

const rngOffScreenPosition = c_(
  (gameWidth, gameHeight) => {
    const spawnPoints = generateOffScreenPositions(gameWidth, gameHeight)

    return pipe(
      () => _.randomBetween(0, 4),
      _.findInObject(spawnPoints),
      res => res.getOrElse({ x: 0, y: 0})
    )()
  }
)

const group = c_(
  (stage, name) => stage.groups[name]
)

const updateScoreUI = c_(
  (scoreText, score) =>
    pipe(
      Math.floor,
      _.numberCommas,
      _.set(scoreText, "text")        
    )(score)
)

const increaseScore = c_(
  (delta, state) => 
    pipe(
      () => state.elapsedTime += delta,
      elapsed => state.score = scoreMultiplier(elapsed)
    )()
)

const scoreMultiplier = elapsed => Math.pow(3*elapsed, 2)

export class Game extends Phaser.State {
  init(options) { 
    this.refs = {}
    this.state = new State({
      ...initialState,
      ...options
    })

    this.groups = new Groups(this.game, [
      "default",
      ...Object.values(Physics.CollisionGroups)
    ])
  }

  create() {
    const { 
      entities, 
      timers,
      score, 
      physicsStep
    } = this.state

    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    stream(
      _.push(timers, new Timer(physicsStep, true)), 
      () => Physics.testCollisions(this, entities)
    )

    _.set(this.refs, "scoreText", this.game.add.text(20, 20, score, config.SCORE_STYLE))
    // _.set(this.refs, "bonusText", this.game.add.text(20, 60, 0, config.SCORE_STYLE))
    this.spawnPlayer()
    this.startAsteroids()
  }

  spawnPlayer() {
    const playerState = {
      position: { 
        x: this.world.centerX, 
        y: this.world.centerY 
      }
    }

    const player = _.push(
      this.state.entities,
      Stage.spawnObject(
        this.game, 
        Spaceship, 
        group(this, Physics.CollisionGroups.Player)
      )(playerState)
    )

    stream(
      player.superBoost,
      position => {
        this.game.camera.shake(0.01, 60)
        Stage.spawnObject(
          this.game, 
          Boost, 
          group(this, "default")
        )({ position })
      }
    )

    window.player = player
  }

  startAsteroids() {
    const spawnRate = () => this.state.asteroidSpawnRate
    const spawnRandomAsteroid = pipe(
      () => createAsteroidProps(this.game.width, this.game.height),
      Stage.spawnObject(this.game, Asteroid, group(this, Physics.CollisionGroups.Asteroid))
    )

    const onSpawnTimer = timer => {
      timer.setTo(spawnRate())
      _.push(this.state.entities, spawnRandomAsteroid())
    }

    stream(
      _.push(this.state.timers, new Timer(spawnRate(), true)),
      onSpawnTimer
    )
  }

  /*
    
  */
  update() {
    _.set(this.state, "entities", Stage.updateEntities(this.state.entities))
    _.set(this.state, "timers",
      Stage.updateTimers(
        _.delta(this.game, 1), 
        this.state.timers
      )
    )

    pipe(
      () => increaseScore(_.delta(this.game, 1), this.state),
      updateScoreUI(this.refs.scoreText)
    )()

    // this.refs.bonusText.text = Math.floor(scoreMultiplier(this.state.elapsedTime))
  }

  render() {
    if (window.debugGame) {
      this.state.entities.forEach(Debug.drawBody(this.game))
    }
  }
}

// window.debugGame = true