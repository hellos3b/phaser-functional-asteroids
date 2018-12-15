import { Maybe, c_ } from './functional'

/* 
  maybeProp :: (Object, String) -> Maybe(Any)
  Returns an array of 
*/
export const findInObject = c_(
	(obj, key) => Maybe(obj[key])
)

/* 
  delta :: (Phaser.Game, Float) -> Float
  Multiplies a value by the game's delta
*/
export const delta = c_( 
  game =>  game.time.physicsElapsed
)

/* 
  merge :: (Object, Object) -> Object
*/
export const merge = c_( 
  (obj1, obj2) => Object.assign(obj1, obj2)
)

/* 
  mergeIn :: (Object, Object) -> Object
  For merging arg1 into arg2
*/
export const mergeIn = c_( 
  (obj1, obj2) => Object.assign(obj2, obj1)
)

export const length = c_(
  (key, fn, obj) => Maybe(obj[key])
    .getOrElse([])
    .length
      ? fn(obj) 
      : obj
)

export const id = x => x

export const deepMerge = c_(
  (target, source) => {
    // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
    for (let key of Object.keys(source)) {
      if (source[key] instanceof Object && key in target) Object.assign(source[key], merge(target[key], source[key]))
    }
  
    // Join `target` and modified `source`
    Object.assign(target || {}, source)
    return target
  }
)

export const concat = c_(
  (arr1, arr2) => arr1.concat(arr2)
)
/* 
  rnd :: (Int, Int) -> Int
*/
export const rnd = c_(
  (min, max) =>
    Math.floor(Math.random()*(max-min)) + min
)

export const map = c_(
  (fn, arr) => arr.map(fn)
)

export const timerReady = c_(
  (currentTime, limit) => currentTime >= limit
)

/* 
  fluff :: (Int, Int) -> Int
  Takes a value, and adds a random +/- amount
*/
export const fluff = c_(
  (value, amount) => value + randomBetween(amount*-1, amount)
)

export const toRadians = c_(
  angle => angle * (Math.PI / 180)
)

/*
  numberCommas :: Int -> String
*/
export const numberCommas = c_(
  num => Number(num).toLocaleString()
)

export const log = c_(
  (msg, val) => {
    console.log(msg, val)
    return val
  }
)

export const no = c_(
  (key, fn, obj) => !obj[key] ? fn(obj) : obj
)

export const has = c_(
  (key, fn, obj) => !!obj[key] ? fn(obj) : obj
)

export const filter = c_(
  (fn, arr) => arr.filter(fn)
)

export const flat = arr =>
  arr.reduce( (res, cur) => merge(res, cur), {})

export const toObject = c_(
  (val, keys) => keys.reduce( (res, n) => {
    res[n] = val
    return res
  }, {})
)

/*
  reduceDefaults :: Any -> Object, String(key) -> Object
  Takes in a default value and an array, and creates
  an object with the default value who's keys are the array
*/
export const reduceDefaults = c_(
  defaultValue =>
    (res, val) => {
      if (!res) res = {}
      res[val] = defaultValue
      return 
    }
)

export const set = c_(
  (obj, key, val) => {
    obj[key] = val
    return val
  }
)

export const each = c_(
  (fn, arr) => arr.forEach(fn)
)


export const objMap = c_(
  (fn, obj) => Object
    .entries(obj)
    .map( ([key, value]) => fn(key, value))
)

export const push = c_(
  (arr, val) => [...arr, val]
)