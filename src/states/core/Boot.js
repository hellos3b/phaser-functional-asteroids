import Phaser from 'phaser'
import WebFont from 'webfontloader'
import * as config from '@/config/game'

export class Boot extends Phaser.State {
  init() {
    console.log("boot start")
    this.stage.backgroundColor = config.BACKGROUND_COLOR
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload() {
    if (config.WEBFONTS.length) {
      WebFont.load({
        google: {
          families: config.WEBFONTS
        },
        active: this.fontsLoaded
      })
    }

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    text.anchor.setTo(0.5, 0.5)

    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
  }

  render() {
    if (config.WEBFONTS.length && this.fontsReady) {
      this.state.start('Splash')
    }
    if (!config.WEBFONTS.length) {
      this.state.start('Splash')
    }
  }

  fontsLoaded() {
    this.fontsReady = true
  }
}
