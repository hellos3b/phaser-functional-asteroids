/* globals __DEV__ */
import Phaser from 'phaser'
import { Asteroid } from '@/gameobjects/Asteroid'

export class Game extends Phaser.State {
  init() { 
    this._objects = []
  }
  preload() { }

  create() {
    const asteroid = new Asteroid(this.game, {
      position: {
        x: this.world.centerX,
        y: this.world.centerY
      },
      asset: 'spritesheet'
    })

    this._objects.push(asteroid)
    this.game.add.existing(asteroid.sprite)
  }

  update() {
    this._objects.forEach( o => o.update && o.update() )
  }
}
