import * as _ from '@/utils'
import * as Stage from '@/core/Stage'
import * as Entity from '@/core/Entity'
import * as Audio from '@/core/Audio'

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
        frames  : [6, 7, 8, 9],
        fps     : 20,
        onDone  : Events.onDone
      }
    },
    animation: 'play'
  }, opt)

  return new Entity.Entity(props)
}

Stage.register("Boost", Create)

const create = entity => entity.stage.game.camera.shake(0.01, 60)