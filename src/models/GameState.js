import * as _ from "@/utils"

export const model = _.Model({
  config: {
    lastAsteroidSpawn : 0,
    asteroidSpawnRate : 0.15,
    physicsStep       : 30 / 1000
  },
  state: {
    paused: false,
    bonus       : 0,
    elapsedTime : 1
  },
  gameObjects : [],
  spawnQueue: [],
  timers      : []
})