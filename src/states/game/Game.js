/* globals __DEV__ */
import Phaser from 'phaser'
import { Asteroid } from '@/gameobjects/Asteroid'

export class Game extends Phaser.State {
  init() { }
  preload() { }

  create() {
    const asteroid = new Asteroid(this.game, {
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'spritesheet'
    })

    this.game.add.existing(asteroid.sprite)
  }
}
