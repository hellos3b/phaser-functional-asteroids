/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '@/sprites/Mushroom'

export class Game extends Phaser.State {
  init() { }
  preload() { }

  create() {
    console.log("game start")
    const bannerText = 'welcome'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
      font: '40px Bangers',
      fill: '#77BFA3',
      smoothed: false
    })

    banner.padding.set(10, 16)
    banner.anchor.setTo(0.5)

    this.mushroom = new Mushroom({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'mushroom'
    })

    this.game.add.existing(this.mushroom)
  }

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
