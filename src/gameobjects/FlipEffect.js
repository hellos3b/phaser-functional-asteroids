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
    create: create,
    events: {
      [Events.onDone]: Entity.die
    },

    // sprite
    asset       : 'spaceship',
    group       : 'default',
    frame       : 0,
    animations  : {
      play      : {
        frames  : [12, 13, 14, 15],
        fps     : 20,
        onDone  : Events.onDone
      }
    },
    animation: 'play'
  }, opt)

  return new Entity.Entity(props)
}

Stage.register("Flip", Create)

const create = entity => {
  Audio.play("flip")
}