export const update = c_(
    (state, delta) => {
        state.position = {
            x: state.position.x + (state.velocity.x * state.speed * delta),
            y: state.position.y + (state.velocity.y * state.speed * delta)
        }
    }
)