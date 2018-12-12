import Phaser from "phaser"
import { c_, pipe } from "@/utils/functional"

const settersMap = {
  position: c_((sprite, value) => {
    sprite.x = value.x
    sprite.y = value.y
  }),
  frame: c_((sprite, value) => {
    sprite.frame = value
  }),
  anchor: c_((sprite, value) => {
    sprite.anchor.setTo(value.x, value.y)
  })
}

/* 
  getObjectKeys :: (Object, keys) -> Object

*/
const filterObjectKeys = c_(
  (obj, keys) => 
    keys.reduce( (res, key) => {
        if (obj[key]) res[key] = obj[key]
        return res
      }, {})
)

// execFunctions :: (Object, State, [ [key], [callback] ])

const spriteUpdate = c_((context, values, setters) => 
  Object
    .entries(setters)
    .forEach( ([key, callback]) => {
      callback(context, values[key]) 
    })
)

export class Sprite extends Phaser.Sprite {

  constructor (game, state) {
    super(game, state.position.x, state.position.y, state.asset)

    this.setState(state, Object.keys(state))
  }

  setState(state, keys) {
    const callbacks = filterObjectKeys(settersMap, keys || state.$dirty)
    spriteUpdate(this, state, callbacks)
  }
  
}
