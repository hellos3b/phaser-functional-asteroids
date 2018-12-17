import * as Entity from '@/models/Entity'
import { pipe } from '@/utils/functional'
import * as _ from '@/utils'
import * as V2 from '@/utils/Vector2'
import * as EventManager from '@/core/Events'

export const Events = {
  onDone: "boost"
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
    play: {
      frames: [6, 7, 8, 9],
      fps: 20,
      onDone: Events.onDone
    }
  },
  animation: "play",
})

const SPAWN_OFFSET = 16

/*
  getPosition :: Spaceship -> Object
*/
export const getPosition = spaceship => pipe(
    V2.fromAngle,
    V2.multiply(SPAWN_OFFSET),
    V2.add(spaceship.position)
  )(spaceship.angle)

/*
  BoostEvents :: () -> Map(String, Function)
*/
const BoostEvents = () => ({
  [Events.onDone]: (stage, entity) => Entity.die(entity)
})

/*
  create :: (Phaser.State, Spaceship) -> Boost
*/
export const create = c_(
  (stage, target) => 
    _.merge(
      Create(), {
        position: getPosition(target),
        events: EventManager.Events(stage, BoostEvents())
      })
)