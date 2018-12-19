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
    asset       : 'explosion',
    group       : 'default',
    frame       : 0,
    animations  : {
      play      : {
        frames  : [0, 1, 2, 3],
        fps     : 20,
        onDone  : Events.onDone
      }
    },
    animation: 'play'
  }, opt)

  return new Entity.Entity(props)
}

Stage.register("Explosion", Create)

const create = entity => {
  Audio.play("dead")
  entity.stage.game.camera.shake(0.04, 120)
}