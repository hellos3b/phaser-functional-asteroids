export const Timer = function(limit, stream, looping=false) {
    let time = 0

    this.add = (timePassed) => {
        time += timePassed
        if (this.done()) {
            stream()

            if (looping) {
                this.reset()
            }
        }
        return this
    }

    this.done = () => time >= limit

    this.reset = () => {
        time = 0
    }
}