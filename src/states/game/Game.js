/* globals __DEV__ */
import Phaser from 'phaser'
import * as Stage from '@/core/Stage'
import * as Utils from '@/utils'
import { Timer } from '@/core/Timer'
import { Groups } from '@/core/Groups'
import { c_, State, pipe, Maybe } from '@/utils/functional'

import { Asteroid } from '@/gameobjects/Asteroid'
import { Spaceship } from '@/gameobjects/Spaceship'

import * as config from '@/config/game'
import * as Physics from '@/core/Physics'
import * as Vector2 from '@/utils/Vector2'
import * as Debug from '@/core/Debug'

const initialState = {
  entities: [],
  timers: [],
  lastAsteroidSpawn: 0,
  asteroidSpawnRate: 1,
  physicsStep: 30 / 1000,
  score: 0,
  elapsedTime: 0
}

export class Game extends Phaser.State {
  init(options) { 
    this.state = new State({
      ...initialState,
      ...options
    })

    this.groups = new Groups(this.game, [
        "default",
        ...Object.values(Physics.CollisionGroups)
      ])
  }

  preload() { }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.spawnObject(
      Spaceship, 
      Physics.CollisionGroups.Player, 
      {
        position: {
          x: this.world.centerX,
          y: this.world.centerY
        }
      })

    this.scoreText = this.game.add.text(20, 20, this.state.score, config.SCORE_STYLE);

    this.startPhysicsTimer()
    this.startAsteroidTimer()
  }

  spawnObject(T, group, props) {
    return pipe(
      Stage.createObject(this.game, T),
      Stage.addToScene(this.game),
      Stage.addToGroup(this.groups[group]),
      entity => {
        this.state.entities.push(entity)
        return entity
      }
    )(props) 
  }

  randomAsteroidProps() {
    const spawn = this.randomPositionOffScreen(),
          target = {
            x: Utils.fluff(this.game.world.centerX, 300),
            y: Utils.fluff(this.game.world.centerY, 300)
          }

    return {
      position: spawn,
      speed   : Utils.randomBetween(50, 150),
      velocity: pipe(
        () => Vector2.toTarget(spawn, target),
        Vector2.multiply(Utils.randomBetween(100, 200))
      )()
    }
  }

  randomPositionOffScreen() {
    const randomX = Utils.randomBetween(0, this.game.width),
      randomY = Utils.randomBetween(0, this.game.height),
      spawnPoints = {
        0: { x: -32, y: randomY },
        1: { x: this.game.width + 32, y:randomY },
        2: { x: randomX, y: -32 },
        3: { x: randomX, y: this.game.height + 32 }
      }

    return pipe(
      () => Utils.randomBetween(0, 4),
      Utils.findInObject(spawnPoints),
      result => result.get()
    )()
  }

  addTimer(frequency, callback, loop) {
    this.state.timers.push(new Timer(frequency, callback, loop))
  }

  startPhysicsTimer() {
    this.addTimer(this.state.physicsStep, () => {
      Physics.testCollisions(this, this.state.entities)
    }, true)
  }

  startAsteroidTimer() {
    this.addTimer(this.state.asteroidSpawnRate, () => {
      this.spawnRandomAsteroid()
      this.startAsteroidTimer()      
    })
  }

  update() {
    Stage.updateEntities(this.state.entities)
    Stage.updateTimers(
      Utils.delta(this.game, 1), 
      this.state.timers
    )

    this.updateScore()

    this.state.entities = this.state.entities.filter(n => n.state.alive)
    this.state.timers = this.state.timers.filter(t => !t.done())
  }

  updateScore() {
    this.state.elapsedTime += Utils.delta(this.game, 1)

    this.state.score += 0.25 * this.state.elapsedTime
    this.scoreText.text = pipe(
      Math.floor,
      Utils.numberCommas
    )(this.state.score)
  }

  render() {
    if (window.debugGame) {
      this.state.entities.forEach(Debug.drawBody(this.game))
    }
  }
}

window.debugGame = true