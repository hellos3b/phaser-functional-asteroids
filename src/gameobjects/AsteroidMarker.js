import { c_ } from '@/utils/functional'
import * as _ from '@/utils'
import * as Entity from '@/core/Entity'
import * as V2 from '@/utils/Vector2'
import * as Physics from '@/core/Physics'
import * as Stage from '@/core/Stage'

const POSITION_PAD = 6

export const Create = (opt={}) => {
  const props = Object.assign({
    follow  : null,
    group   : "default",
    // methods
    create     : create,
    update  : update,
    
    // sprite
    asset       : 'spritesheet',
    frame       : 7
  }, opt)

  return new Entity.Entity(props)
}

Stage.register("AsteroidMarker", Create)

const create = entity => updatePosition(entity)

// update :: (Phaser.State, Entity) -> Entity
// const update = entity => updatePosition(entity)
const update = entity => isOffScreen(entity.follow) ?  updatePosition(entity) : Entity.die(entity)

const isOffScreen = entity =>
  !entity.alive || entity.position.x < 0 || entity.position.x > entity.stage.game.width
  || entity.position.y < 0 || entity.position.y > entity.stage.game.height

const updatePosition = entity => {
  const { position } = entity.follow
  const {width, height} = entity.stage.game

  if (position.x < 0) {
    return entity.$commit({
      position: {
        x: POSITION_PAD,
        y: position.y
      },
      angle: -90
    })
  }
  if(position.x > width) {
    return entity.$commit({
      position: {
        x: width - POSITION_PAD,
        y: position.y
      },
      angle: 90
    })
  }
  if(position.y < 0) {
    return entity.$commit({
      position: {
        x: position.x,
        y: POSITION_PAD
      },
      angle: 0
    })
  }
  if(position.y > height) {
    return entity.$commit({
      position: {
        x: position.x,
        y: height - POSITION_PAD
      },
      angle: 180
    })
  }
  return entity
}