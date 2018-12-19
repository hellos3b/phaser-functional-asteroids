import "@babel/polyfill"

import 'pixi'
import Phaser from 'phaser'

import './main.less'

import * as States from '@/states'

import { GAME_WIDTH, GAME_HEIGHT } from '@/config/game'

class Game extends Phaser.Game {
  constructor () {
    const docElement = document.documentElement

    super(GAME_WIDTH, GAME_HEIGHT, Phaser.CANVAS, 'content', null)

    for (var k in States) {
      this.state.add(k, States[k], false)
    }

    this.state.start('Splash')
  }
}

new Game()