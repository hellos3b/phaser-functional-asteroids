import Phaser from "phaser"
import { c_, Maybe, pipe } from "@/utils/functional"

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
  findInObject :: (Object, String) -> Maybe(Any)
  Returns an array of 
*/
const findInObject = c_(
  (obj, key) => Maybe(obj[key])
)

/* 
  commitSpriteUpdate :: (Phaser.Sprite, State, Maybe(Function)) -> null
  Updates the sprite with all the setters to their new values
*/
const commitSpriteUpdate = c_(
  (sprite, state, modifier) => 
    modifier
      .getOrElse(()=>{})
      .call(null, sprite, state)
)

/* 
  prefixPropertyName :: String -> String
  Converts property name to a set function name, i.e. position -> setPosition
*/
const prefixPropertyName = c_(
  str => "set" 
      + str.charAt(0).toUpperCase() 
      + str.substring(1)
)


export class Sprite extends Phaser.Sprite {

  constructor (game, state) {
    super(game, state.position.x, state.position.y, state.asset)

    this.setState(state, Object.keys(state))
  }

  setState(state, keys) {
    keys = keys || state.$dirty
    keys.forEach( k => this.updateProperty(state, k) )
  }

  updateProperty(state, key) {
    return pipe(
      prefixPropertyName,
      findInObject(modifiers),
      commitSpriteUpdate(this, state)
    )(key)
  }
}
