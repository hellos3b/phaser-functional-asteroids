import Phaser from "phaser"
import { c_ } from "@/utils/functional"
import { pipe } from "../utils/functional";

// Holds a mapping to set state values to sprite values
const modifiers = {
  setPosition: c_((sprite, state) => {
    sprite.x = state.position.x
    sprite.y = state.position.y
  }),
  setFrame: c_((sprite, state) => {
    sprite.frame = state.frame
  }),
  setAnchor: c_((sprite, state) => {
    sprite.anchor.setTo(state.anchor.x, state.anchor.y)
  })
}

/* 
  getObjectKeys :: (Object, [String]) -> [Any]
  Returns an array of 
*/
const filterObject = c_(
  (obj, keys) => 
    keys.map( key => obj[key])
      .filter( key => !!key)
)

/* 
  spriteUpdate :: (Phaser.Sprite, State, [Function]) -> null
  Updates the sprite with all the setters to their new values
*/
const pushSpriteUpdate = c_(
  (sprite, state, setters) => setters.forEach( s => s(sprite, state) )
)

/* 
  prefixPropertyName :: [String] -> [String]
  Converts property name to a set function name, i.e. position -> setPosition
*/
const prefixPropertyNames = c_(
  strings => strings
    .map( str => 
      "set" + str.charAt(0).toUpperCase() + str.substring(1)
    )
)


export class Sprite extends Phaser.Sprite {

  constructor (game, state) {
    super(game, state.position.x, state.position.y, state.asset)

    this.setState(state, Object.keys(state))
  }

  setState(state, keys) {
    pipe(
      () => prefixPropertyNames(keys || state.$dirty),
      filterObject(modifiers),
      pushSpriteUpdate(this, state)
    )()
  }
}
