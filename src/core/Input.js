import {State,c_, pipe} from "@/utils/functional"
import * as Spaceship from "@/gameobjects/Spaceship"
import * as _ from "@/utils"

export const Keys = {
  Accelerate: 87,
  RotateRight: 68,
  RotateLeft: 65,
  Boost: 32
}

// keyDown :: (State, Int, Function, Entity) => Entity
export const keyDown = c_(
  (state, keyCode, callback, entity) => 
    state[keyCode] ? callback(entity) : entity
)

// onKeyUp :: (State, Int, Function, Entity) => Entity
export const onKeyUp = c_(
  (state, keyCode, callback, entity) => 
    (!state[keyCode] && state.$old[keyCode])
      ? callback(entity)
      : entity
)

// onKeyDown :: (State, Int, Function, Entity) => Entity
export const onKeyDown = c_(
  (state, keyCode, callback, entity) => 
    (state[keyCode] && !state.$old[keyCode]) 
      ? callback(entity)
      : entity
)

export class InputStream {

  constructor() {
    const initialState = _.toObject(false, Object.values(Keys))

    this.state = new State(initialState)

    document.addEventListener('keydown', (e) => this.onKeyDown(e))
    document.addEventListener('keyup', (e) => this.onKeyUp(e))
  }

  onKeyDown(e) {
    if (this.state.hasOwnProperty(e.keyCode)) {
      this.state[e.keyCode] = true
    }
  }

  onKeyUp(e) {
    if (this.state.hasOwnProperty(e.keyCode)) {
      this.state[e.keyCode] = false
    }
  }

  clear() {
    this.state.$clean()
  }

}

export const PlayerInput = c_(
  (stage, entity) => {
    const { state } = stage.input
    const { Accelerate, RotateRight, RotateLeft, Boost } = Keys

    return pipe(
      keyDown(state)(Accelerate, Spaceship.Accelerate(stage)),
      onKeyUp(state)(Accelerate, Spaceship.StopAccelerating),
      keyDown(state)(RotateRight, Spaceship.Rotate(stage, 1)),
      keyDown(state)(RotateLeft, Spaceship.Rotate(stage, -1)),
      onKeyDown(state)(Boost, Spaceship.Boost(stage))
    )(entity)
  }
)