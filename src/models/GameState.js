import * as _ from "@/utils"

export const model = _.Model({
  paused      : false,
  end         : false,
  bonus       : 0,
  score       : 0,
  elapsedTime : 1,
  playerVelocity: 1,
  gameObjects : [],
  spawnQueue  : [],
  timers      : []
})