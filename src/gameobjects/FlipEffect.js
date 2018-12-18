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
  asset: 'spaceship',
  animations: {
    flip: {
      frames: [12, 13, 14, 15],
      fps: 10,
      onDone: Events.onDone
    }
  },
  animation: "flip",
})

/*
  BoostEvents :: () -> Map(String, Function)
*/
const FlipEvents = () => ({
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
        angle: target.angle,
        events: EventManager.Events(stage, FlipEvents())
      })
)