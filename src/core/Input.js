import {State,c_, pipe} from "@/utils/functional"
import * as Spaceship from "@/gameobjects/Spaceship"
import * as _ from "@/utils"

export const Keys = {
  Accelerate: 87,
  RotateRight: 68,
  RotateLeft: 65,
  Boost: 32,
  Restart: 70
}

const initialState = _.toObject(false, Object.values(Keys))
let state = new State(initialState)

// keyDown :: (State, Int, Function, Entity) => Entity
export const keyDown = c_(
  (keyCode, callback, entity) => 
    state[keyCode] ? callback(entity) : entity
)

// onKeyUp :: (State, Int, Function, Entity) => Entity
export const onKeyUp = c_(
  (keyCode, callback, entity) => 
    (!state[keyCode] && state.$old[keyCode])
      ? callback(entity)
      : entity
)

// onKeyDown :: (State, Int, Function, Entity) => Entity
export const onKeyDown = c_(
  (keyCode, callback, entity) => 
    (state[keyCode] && !state.$old[keyCode]) 
      ? callback(entity)
      : entity
)

const setKeyDown = e => {
  if (state.hasOwnProperty(e.keyCode)) {
    state[e.keyCode] = true
  }
}

const setKeyUp = e => {
  if (state.hasOwnProperty(e.keyCode)) {
    state[e.keyCode] = false
  }
}

export const clear = () => state.$clean()

document.addEventListener('keydown', (e) => setKeyDown(e))
document.addEventListener('keyup', (e) => setKeyUp(e))