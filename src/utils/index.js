import { Maybe, c_ } from './functional'

/* 
  maybeProp :: (Object, String) -> Maybe(Any)
  Returns the object's value wrapped in a Maybe
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
  Reversed args for merge
*/
export const mergeIn = c_( 
  (obj1, obj2) => Object.assign(obj2, obj1)
)

/* 
  length :: (String, Function, T) -> T
  Will apply the function with T if T.length
*/
export const length = c_(
  (key, fn, obj) => Maybe(obj[key])
    .getOrElse([])
    .length
      ? fn(obj) 
      : obj
)

/* 
  id :: T -> T
*/
export const id = x => x

/* 
  deepMerge :: (Object, Object) -> Object
*/
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

/* 
  concat :: (Array, Array) -> Array
*/
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

/* 
  map :: (Function, Array) -> Array
*/
export const map = c_(
  (fn, arr) => arr.map(fn)
)

/* 
  timerReady :: (Float, Float) -> Boolean
*/
export const timerReady = c_(
  (currentTime, limit) => currentTime >= limit
)

/* 
  fluff :: (Int, Int) -> Int
  Takes a value, and adds a random +/- amount
*/
export const fluff = c_(
  (value, amount) => value + rnd(amount*-1, amount)
)

export const noop = () => {}

/* 
  toRadians :: Float -> Float
  Takes a value, and adds a random +/- amount
*/
export const toRadians = c_(
  angle => angle * (Math.PI / 180)
)

/*
  numberCommas :: Int -> String
  Turns a numer like 100000 to 100,000
*/
export const numberCommas = c_(
  num => Number(num).toLocaleString()
)

/*
  log :: (String, T) -> T
  Good for logging in pipes
*/
export const log = c_(
  (msg, val) => {
    console.log(msg, val)
    return val
  }
)

/*
  no :: (Key, Function, T) -> T
  if T doesn't have 'key', call function and T
*/
export const no = c_(
  (key, fn, obj) => !obj[key] ? fn(obj) : obj
)

/*
  has :: (Key, Function, T) -> T
  if T has 'key', call function and T
*/
export const has = c_(
  (key, fn, obj) => !!obj[key] ? fn(obj) : obj
)

/*
  filter :: (Function, Array) -> Array
*/
export const filter = c_(
  (fn, arr) => arr.filter(fn)
)

export const filterNull = arr => arr.filter( n => !n)

/*
  mergeDown :: Array(Object) -> Object
*/
export const mergeDown = arr =>
  arr.reduce( (res, cur) => merge(res, cur), {})

/*
  toObject :: (T, Array) -> Object[Array->T]
  Converts an array into an object with default vaues
*/
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

/*
  set :: (Object, String, T) -> T
  Set a value on an object, returns value
*/
export const set = c_(
  (obj, key, val) => {
    obj[key] = val
    return val
  }
)

/*
  each :: (Function, Array) -> Array
*/
export const each = c_(
  (fn, arr) => arr.forEach(fn)
)

/*
  Model :: Object -> Object -> Object
*/
export const Model = initial => (obj={}) => Object.assign({}, initial, obj)

/*
  objMap :: (Function, Object) -> Object
*/
export const objMap = c_(
  (fn, obj) => Object
    .entries(obj)
    .map( ([key, value]) => fn(key, value))
)

/*
  push :: (Array, Any) -> Array
*/
export const push = c_(
  (arr, val) => [...arr, val]
)

export const getOrElse = c_(
  (optional, T) => Maybe(T).getOrElse(optional)
)