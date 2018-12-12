import Phaser from "phaser"
import { c_ } from "@/utils/functional"
import { pipe } from "../utils/functional";

// Holds a mapping to set state values to sprite values
const settersMap = {
  position: c_((sprite, state) => {
    sprite.x = state.position.x
    sprite.y = state.position.y
  }),
  frame: c_((sprite, state) => {
    sprite.frame = state.frame
  }),
  anchor: c_((sprite, state) => {
    sprite.anchor.setTo(state.anchor.x, state.anchor.y)
  })
}

/* 
  getObjectKeys :: (Object, [String]) -> [Any]
  Returns an object with the keys, but only if they exist
*/
const filterObjectKeys = c_(
  (obj, keys) => 
    keys.map( key => obj[key])
      .filter( key => !!key)
)

/* 
  spriteUpdate :: (Phaser.Sprite, State, Object(key->Function)) -> null
  Updates the sprite with all the setters to their new values
*/
const pushSpriteUpdate = c_((sprite, state, setters) => 
  setters.forEach( s => s(sprite, state) )
)

export class Sprite extends Phaser.Sprite {

  constructor (game, state) {
    super(game, state.position.x, state.position.y, state.asset)

    this.setState(state, Object.keys(state))
  }

  setState(state, keys) {
    // If no specific keys provided, only update the dirty values
    pipe(
      () => filterObjectKeys(settersMap, keys || state.$dirty),
      pushSpriteUpdate(this, state)
    )()
  }
}
