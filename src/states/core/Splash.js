import Phaser from 'phaser'
import * as Sprites from '@/config/sprites'


export class Splash extends Phaser.State {
  init () {
    console.log("splash start")
  }

  preload () {
    // this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    // this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    // centerGameObjects([this.loaderBg, this.loaderBar])

    // this.load.setPreloadSprite(this.loaderBar)
    
    Object.keys(Sprites)
      .forEach( name => {
        const sprite = this.load.spritesheet(
          name,
          Sprites[name].path,
          Sprites[name].width,
          Sprites[name].height,
          Sprites[name].frames
        )

        if (Sprites[name].animations) {
          const animations = Sprites[name].animations
          Object.keys(animations)
            .forEach( animName => {
              sprite.animations.add(
                animName,
                animations[animName].frames,
                animations[animName].fps,
                animations[animName].loop
              )
            })
        }
      }) 
  }

  create () {
    this.state.start('Game')
  }
}
