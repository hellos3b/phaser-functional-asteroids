/* globals __DEV__ */
import Phaser from 'phaser'
import * as Stage from '@/core/Stage'
import * as Utils from '@/utils'
import { Timer } from '@/core/Timer'
import { c_, State, pipe, Maybe } from '@/utils/functional'

import { Asteroid } from '@/gameobjects/Asteroid'
import { Spaceship } from '@/gameobjects/Spaceship'

const initialState = {
  entities: [],
  lastAsteroidSpawn: 0,
  asteroidSpawnRate: 1
}

export class Game extends Phaser.State {
  init(options) { 
    this.state = new State({
      ...initialState,
      ...options
    })
  }

  preload() { }

  create() {
    this.spawnObject(Asteroid, null, {
      position: this.randomPosition()
    })

    this.spawnObject(Spaceship, null, {
      position: {
        x: this.world.centerX,
        y: this.world.centerY
      }
    })
  }

  spawnObject(T, group, props) {
    console.log("spawn object", {T, group, props})
    return pipe(
      Stage.createObject(this.game, T),
      Stage.addToScene(this.game),
      Stage.addToGroup(Maybe(group)),
      entity => {
        this.state.entities = [
          ...this.state.entities,
          entity
        ]
      }
    )(props) 
  }

  spawnRandomAsteroid() {
    return pipe(
      () => ({
        position: this.randomPosition()
      }),
      c_(this.spawnObject.bind(this))(Asteroid, null)
    )()
  }

  randomPosition() {
    return {
      x: Utils.randomBetween(0, this.game.width),
      y: Utils.randomBetween(0, this.game.height)
    }
  }

  spawnAsteroidIfReady() {
    this.state.lastAsteroidSpawn += Utils.delta(this.game, 1)
    if (this.asteroidReady()) {
      this.resetAsteroidTimer()
      this.spawnRandomAsteroid()
    }
  }

  resetAsteroidTimer() {
    this.state.lastAsteroidSpawn = 0
  }

  asteroidReady() {
    return Utils.timerReady(
      this.state.lastAsteroidSpawn,
      this.state.asteroidSpawnRate
    )
  }

  update() {
    Stage.updateEntities(this.state.entities)

    this.spawnAsteroidIfReady()
  }
}
