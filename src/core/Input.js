import { State, c_ } from "@/utils/functional"

export const Keys = {
    Thrust: 87,
    RotateRight: 68,
    RotateLeft: 65,
    SuperThrust: 32
}

// keyDown :: (Int, Function, State) => State
export const keyDown = c_(
    (keyCode, callback, keysState) => {
        keysState[keyCode] && callback()
        return keysState
    }
)

// onKeyUp :: (Int, Function, State) => State
export const onKeyUp = c_(
    (keyCode, callback, keysState) => {
        if (!keysState[keyCode] && keysState.$old[keyCode]) {
            callback()
        }
        return keysState
    }
)

// onKeyDown :: (Int, Function, State) => State
export const onKeyDown = c_(
    (keyCode, callback, keysState) => {
        if (keysState[keyCode] && !keysState.$old[keyCode]) {
            callback()
        }
        return keysState
    }
)

export class InputStream {

    constructor() {
        const initialState = Object.values(Keys)
            .reduce( (res, keyCode) => {
                return {
                    ...res,
                    [keyCode]: false
                }
            }, {})

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

    stream(pipe) {
        pipe(this.state)
        this.state.$clean()
        return this
    }
}