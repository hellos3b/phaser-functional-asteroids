
/*
    OldState
    Takes in two objects, and will return the original value if defined, if not the new one
*/
const OldState = function (currentState, oldState) {
  const handler = {
    get(target, prop) {
      return (oldState[prop] !== undefined) ? oldState[prop] : target[prop]
    },
    set() {
      // The old state should just never be overwritten
      throw new Error("Cannot modify original state")
    }
  }

  return new Proxy(currentState, handler)
}

const isObject = (T) => 
  (typeof T === 'object' && !(T instanceof Array) && T !== null)

const objEquals = c_(
  (obj1, obj2) => {
    for(var k in obj1) {
      if (obj1[k] !== obj2[k]) return false
    }
    return true
  }
)

/*
    CleanState
    Define a json object as a state, and whenever it changes set it to "dirty"
    ex:
        const state = CleanState({ foo: "bar" })
        state.foo = "test"
        state.$dirty
        - ["foo"]
        state.$clean()
        state.$dirty
        - []
*/
const State = function (initialState) {
  // Keep track of which values are set to 'dirty'
  // It's a set instead of an array because we only care if the values been changed once
  let dirty = new Set([])

  // Iterate over the initial state, and convert any nested objects into another CleanState
  let state = Object.entries(initialState)
    .reduce((res, [key, value]) => {
      return {
        ...res,
        [key]: value
      }
    }, {})

  // Keeps track of the original values of any prop that has changed
  // gets reset on $clean
  let oldState = {}

  const handler = {
    get(target, prop) {
      // Convert the dirty set into an array (easier to iterate)
      if (prop === "$dirty") return [...dirty]
      // Marks the object as clean
      if (prop === "$clean") {
        return () => {
          dirty = new Set([])
          oldState = {}
        }
      }
      if (prop === "$old") return OldState(state, oldState)
      if (prop === "$commit") return obj => {
        Object.entries(obj).map( 
          ([key, val]) => this.set(target, key, val) 
        )
        return target
      }

      return target[prop]
    },
    set(target, prop, value) {
      if (target[prop] === value) return true
      if (isObject(value) && objEquals(target[prop], value)) return true

      dirty.add(prop)
      // We only want the first value, so we check if undefined so we don't re-write it
      // if it gets changed a second time
      if (oldState[prop] === undefined) {
        oldState[prop] = target[prop]
      }

      target[prop] = value

      return true
    }
  }

  return new Proxy(state, handler)
}

export default State