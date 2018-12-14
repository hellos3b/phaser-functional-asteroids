import Phaser from "phaser"
import { pipe } from "@/utils/functional"

import * as Utils from "@/utils"
import * as Sprite from './Sprite'


export class SpriteObject extends Phaser.Sprite {

  constructor (game, state) {
    super(game, state.position.x, state.position.y, state.asset)

    this.game = game
    this.setState(state, Object.keys(state))
  }

  setState(state, keys) {
    keys = keys || state.$dirty
    keys.forEach( k => this.updateProperty(state, k) )
  }

  updateProperty(state, key) {
    return pipe(
      Sprite.prefixPropertyName,
      Utils.findInObject(Sprite.modifiers),
      Sprite.commitSpriteUpdate(this, state)
    )(key)
  }
}
