import 'pixi'
import 'p2'
import Phaser from 'phaser'

import './main.less'

import * as States from '@/states'

import { GAME_WIDTH, GAME_HEIGHT } from '@/config/game'

class Game extends Phaser.Game {
  constructor () {
    const docElement = document.documentElement
    const width = docElement.clientWidth > GAME_WIDTH ? GAME_WIDTH : docElement.clientWidth
    const height = docElement.clientHeight > GAME_HEIGHT ? GAME_HEIGHT : docElement.clientHeight

    super(width, height, Phaser.CANVAS, 'content', null)

    for (var k in States) {
      this.state.add(k, States[k], false)
    }

    this.state.start('Splash')
  }
}

new Game()