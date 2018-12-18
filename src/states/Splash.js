import Phaser from 'phaser'
import * as Sprites from '@/config/sprites'
import * as Sounds from '@/config/sounds'


const loadSprite = (stage, name, sprite) => 
  stage.load.spritesheet(
    name,
    sprite.path,
    sprite.width,
    sprite.height,
    sprite.frames
  )

const loadAudio = (stage, name, audio) => stage.game.load.audio(name, audio.path)

const preload = stage => {
  Object.keys(Sprites)
    .forEach( name => 
      loadSprite(stage, name, Sprites[name])
    )   

  Object.keys(Sounds)
    .forEach( name => loadAudio(stage, name, Sounds[name] ))
}

const create = stage => stage.state.start('Game')

export const Splash = { 
  preload : function() { preload(this) },
  create  : function() { create(this) }
}