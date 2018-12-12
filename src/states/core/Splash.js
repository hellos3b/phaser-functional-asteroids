import Phaser from 'phaser'
import { centerGameObjects } from '@/utils/utils'
import * as Sprites from '@/config/sprites'


export class Splash extends Phaser.State {
  init () {
    console.log("splash start")
  }

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    
    Object.keys(Sprites)
      .forEach( k => {
          this.load.image(k, Sprites[k].path)
      }) 
  }

  create () {
    this.state.start('Game')
  }
}
