import * as Utils from '@/utils'
import { Vector2 } from '@/utils/Vector2'

export const GRAVITY = -150

export const applyVelocity = c_(
    (delta, state) => {
        state.position = {
            x: state.position.x + (state.velocity.x * delta),
            y: state.position.y + (state.velocity.y * delta)
        }
        return state
    }
)

export const applyGravity = c_(
    (delta, state) => {
        state.velocity = {
            x: state.velocity.x,
            y: state.velocity.y - (GRAVITY * delta)
        }
        return state
    }
)

export const addVelocity = c_(
    (state, delta, velocity) => {
        state.velocity = {
            x: state.velocity.x - (velocity.x * delta),
            y: state.velocity.y - (velocity.y * delta)
        }
    }
)

export const rotate = c_(
    (state, delta, rotation) => {
        state.angle += rotation*delta
    }
)