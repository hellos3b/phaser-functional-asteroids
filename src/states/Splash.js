import Phaser from 'phaser'
import * as Sprites from '@/config/sprites'


const loadSprite = (stage, name, sprite) => 
  stage.load.spritesheet(
    name,
    sprite.path,
    sprite.width,
    sprite.height,
    sprite.frames
  )

const preload = stage =>
  Object.keys(Sprites)
    .forEach( name => 
      loadSprite(stage, name, Sprites[name])
    )   

const create = stage => stage.state.start('Game')

export const Splash = { 
  preload : function() { preload(this) },
  create  : function() { create(this) }
}