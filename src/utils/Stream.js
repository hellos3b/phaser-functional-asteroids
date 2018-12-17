export class Stream {
  constructor() {
    this.listeners = []
  }

  subscribe(fn) {
    this.listeners.push(fn)
  }

  push(val) {
    this.listeners.forEach(fn => fn(val))
  }
}