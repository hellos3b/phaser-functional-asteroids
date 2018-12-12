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