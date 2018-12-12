import { Maybe, c_ } from './functional'

/* 
  findInObject :: (Object, String) -> Maybe(Any)
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
  (game, value) => value ? value * game.time.physicsElapsed  : game.time.physicsElapsed
)

/* 
  combineObject :: (Object, Object) -> Object
*/
export const combineObject = c_( 
  (obj1, obj2) => Object.assign(obj1, obj2)
)

/* 
  randomBetween :: (Int, Int) -> Int
*/
export const randomBetween = c_(
  (min, max) =>
    Math.floor(Math.random()*(max-min)) + min
)

export const timerReady = c_(
  (currentTime, limit) => currentTime >= limit
)

/* 
  randomBetween :: (Int, Int) -> Int
*/
export const ifTrue = c_(
  (min, max) =>
    Math.floor(Math.random()*(max-min)) + min
)