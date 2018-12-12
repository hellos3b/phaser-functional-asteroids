export const Timer = function(limit) {
    let time = 0

    this.add = (timePassed) => {
        time += timePassed
        return this.ready()
    }

    this.ready = () => time >= limit

    this.reset = () => {
        time = 0
    }
}