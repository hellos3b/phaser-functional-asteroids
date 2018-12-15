import { Stream } from '@/utils/Stream'

export class Timer extends Stream {
    constructor(rate, loop=false) {
        super()
        this.time = 0
        this.rate = rate
        this.loop = loop
    }

    addTime(elapsedTime) {
        this.time += elapsedTime

        if (this.done()) {
            this.push(this)

            if (this.loop) {
                this.reset()
            }
        }
        return this
    }

    setTo(rate) {
        this.rate = rate
    }

    done() {
        return this.time >= this.rate
    }

    reset() {
        this.time = 0
    }
}