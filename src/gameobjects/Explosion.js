import * as Entity from '@/models/Entity'
import { pipe } from '@/utils/functional'
import * as _ from '@/utils'
import * as V2 from '@/utils/Vector2'
import * as EventManager from '@/core/Events'

export const Events = {
  onDone: "done"
}

export const Create = () => Entity.model({
  alive: true,
  group: "default",
  position: {
    x: 100,
    y: 100
  },
  frame: 0,
  anchor: {
    x: 0.5,
    y: 0.5
  },
  asset: 'explosion',
  animations: {
    play: {
      frames: [0, 1, 2, 3],
      fps: 10,
      onDone: Events.onDone
    }
  },
  animation: "play",
})

/*
  BoostEvents :: () -> Map(String, Function)
*/
const ExplodeEvents = () => ({
  [Events.onDone]: (stage, entity) => Entity.die(entity)
})

/*
  create :: (Phaser.State, Spaceship) -> Boost
*/
export const create = c_(
  (stage, target) => 
    _.merge(
      Create(), {
        position: target.position,
        events: EventManager.Events(stage, ExplodeEvents())
      })
)