import Phaser from 'phaser'
import { c_ } from '@/utils/functional'

export const drawBody = c_(
  (game, obj) => {
    game.debug.body(obj.sprite)
  }
)