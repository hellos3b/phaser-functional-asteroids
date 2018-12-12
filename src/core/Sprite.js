import Phaser from "phaser"

export class Sprite extends Phaser.Sprite {

  constructor (game, state) {
    super(game, state.x, state.y, state.asset)

    this.setState(state)
  }

  setState(state) {
      this.x = state.x
      this.y = state.y

      this.frame = state.frame

      this.anchor.setTo(state.anchorX, state.anchorY)
  }
}
