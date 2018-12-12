/*
    Maybe
    Wraps a nullable value
*/
export const Maybe = function(T) {
	return {
		apply: (fn) => T && fn(T),
		get: () => T,
		getOrElse: (option) =>
			(T === undefined) ? option : T
	}
}

/*
    pipe
    Creates a function that runs a chain of functions
    ex: 
        const fn = pipe(fn1, fn2, fn3)
        fn(5)
        -- will pass in 5 to fn1, then pass the result to fn2, then pass that result to fn3, and return the value
*/
export const pipe = function () {
	const args = [...arguments]

	return function () {
		const initial = args.shift().apply(this, arguments)
		return args.reduce((result, fn) => fn.call(this, result), initial)
	}
}

/*
    c_
    Allows you to run functions by either arguments or curried
    (basically, wrap every function with this to make life easier)
    ex: 
        const add = curry( (a, b) => a + b )
        add(1, 2)
        add(1)(2)
  
        - other usage:
        const addTwo = add(2)
        const b = addTwo(5)
  
    Used for being able to break functions down into one argument
*/
export const c_ = function (fn) {
	const arity = fn.length

	function given(argsSoFar) {
		return function helper() {
			const updatedArgsSoFar = [...argsSoFar, ...arguments]
			return (updatedArgsSoFar.length >= arity) ? fn.apply(this, updatedArgsSoFar) : given(updatedArgsSoFar);
		}
	}

	return given([]);
}

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
	(typeof T === 'object' && !(T instanceof Array))

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
export const State = function (initialState) {
	// Keep track of which values are set to 'dirty'
	// It's a set instead of an array because we only care if the values been changed once
	let dirty = new Set([])

	// Iterate over the initial state, and convert any nested objects into another CleanState
	let state = Object.entries(initialState)
		.reduce((res, [key, value]) => {
			return {
				...res,
				[key]: isObject(value) ? State(value) : value
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

			return target[prop]
		},
		set(target, prop, value) {
			dirty.add(prop)
			// We only want the first value, so we check if undefined so we don't re-write it
			// if it gets changed a second time
			if (oldState[prop] === undefined) {
				oldState[prop] = target[prop]
			}

			target[prop] = isObject(value) ? State(value) : value

			return true
		}
	}

	return new Proxy(state, handler)
}


// useful for debugging
window.c_ = c_

// /*
//     Here's my mini test cases, we have to functions that do a simple add and subtract
// */
// const add = curry((a, b) => a + b)
// const subtract = curry((a, b) => b - a)

// // generateAsteroids :: Float -> Array[Asteroid]
// const generateAsteroids = curry(rng =>
// 	rng < 0.5 ? [{
// 		x: 0,
// 		y: 1
// 	}, {
// 		x: 5,
// 		y: 4
// 	}] : []
// )

// // createAsteroids :: [Asteroid] -> [Sprite]
// const createAsteroids = curry(asteroids =>
// 	asteroids.map(a => console.log("spawn:", a))
// )

// const gamefp = {
// 	update() {
// 		this.asteroids = [
// 			...this.asteroids,
// 			...this.spawnAsteroids()
// 		]
// 	},
// 	spawnAsteroids: pipe(
// 		Math.random,
// 		generateAsteroids,
// 		createAsteroids
// 	)
// }

// gamefp.update()

// const game = {
// 	update() {
// 		const asteroids = this.generateAsteroids()
// 		this.astroids = this.asteroids.concat(this.spawnAsteroid(asteroids))
// 	},

// 	createAsteroids(asteroids) {
// 		for (var i = 0; i < asteroids.length; i++) {
// 			console.log("spawn:", asteroids[i])
// 		}
// 	},

// 	generateAsteroids() {
// 		const rng = Math.random()
// 		if (rng < 0.5) {
// 			return [{
// 				x: 0,
// 				y: 1
// 			}, {
// 				x: 5,
// 				y: 4
// 			}]
// 		} else {
// 			return []
// 		}
// 	}
// }


// // Create a new function that will add 5, add 10, and then subtract 2
// const doMath = pipe(
// 	add(5),
// 	add(10),
// 	subtract(2)
// )

// const result = doMath(5)

// console.log("result", result)
// // Should be '18'