import * as _ from '@/utils'
import * as Stage from '@/core/Stage'
import * as Audio from '@/core/Audio'
import * as Entity from '@/core/Entity'

export const Events = {
  onDone: "done"
}

export const Create = (opt={}) => {
  const props = Object.assign({
    // methods
    events: {
      [Events.onDone]: Entity.die
    },

    // sprite
    asset       : 'spaceship',
    group       : 'default',
    frame       : 0,
    animations  : {
      play      : {
        frames  : [18, 19, 20],
        fps     : 30,
        onDone  : Events.onDone
      }
    },
    animation: 'play'
  }, opt)

  return new Entity.Entity(props)
}

Stage.register("VelocityEffect", Create)