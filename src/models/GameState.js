import * as _ from "@/utils"

export const model = _.Model({
  paused      : false,
  started     : false,
  end         : false,
  jumps       : 0,
  flips       : 0,
  bonus       : 0,
  score       : 0,
  elapsedTime : 1,
  playerVelocity: 1,
  gameObjects : [],
  spawnQueue  : [],
  timers      : []
})