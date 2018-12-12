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
  timers: [],
  lastAsteroidSpawn: 0,
  asteroidSpawnRate: 1
}

export class Game extends Phaser.State {
  init(options) { 
    this.state = new State({
      ...initialState,
      ...options
    })

    this.startAsteroidTimer()
  }

  preload() { }

  create() {
    this.spawnObject(Spaceship, null, {
      position: {
        x: this.world.centerX,
        y: this.world.centerY
      }
    })
  }

  spawnObject(T, group, props) {
    return pipe(
      Stage.createObject(this.game, T),
      Stage.addToScene(this.game),
      Stage.addToGroup(Maybe(group)),
      entity => {
        this.state.entities = [
          ...this.state.entities,
          entity
        ]
        return entity
      }
    )(props) 
  }

  spawnRandomAsteroid() {
    this.spawnObject(Asteroid, null, {
        position: this.randomPositionOffScreen(),
        speed: Utils.randomBetween(50, 150)
      })
      .moveTowards({
        x: Utils.fluff(this.game.world.centerX, 300),
        y: Utils.fluff(this.game.world.centerY, 300)
      }, Utils.randomBetween(20, 100))
  }

  randomPositionOffScreen() {
    const randomX = Utils.randomBetween(0, this.game.width),
          randomY = Utils.randomBetween(0, this.game.height)

    return pipe(
      () => Utils.randomBetween(0, 4),
      Utils.findInObject({
        0: { x: -32, y: randomY },
        1: { x: this.game.width + 32, y:randomY },
        2: { x: randomX, y: -32 },
        3: { x: randomX, y: this.game.height + 32 }
      }),
      result => result.get()
    )()
  }

  startAsteroidTimer() {
    this.state.timers.push(
      new Timer(this.state.asteroidSpawnRate, () => {
        this.spawnRandomAsteroid()
        this.startAsteroidTimer()
      })
    )
  }

  update() {
    Stage.updateEntities(this.state.entities)
    Stage.updateTimers(
      Utils.delta(this.game, 1), 
      this.state.timers
    )
    
    this.state.entities = this.state.entities.filter(n => n.state.alive)
    this.state.timers = this.state.timers.filter(t => !t.done())
  }
}
