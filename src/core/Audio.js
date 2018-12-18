import { c_ } from '@/utils/functional'
import * as Sounds from '@/config/sounds'
import * as _ from '@/utils'

let sounds = {}

export const Cache = {
  set(name, audio) {
    sounds[name] = audio
  },

  play(name) {
    const sound = sounds[name]
    sound.play()
  },

  loop(name) {
    const sound = sounds[name]
    sound.loopFull()
  },

  stop(name) {
    const sound = sounds[name]
    sound.stop()
  }
}

export const play = name => Cache.play(name)
export const stop = name => Cache.stop(name)
export const loop = name => Cache.loop(name)

export const load = c_(
  (stage, name) => {
    const sound = stage.game.add.audio(name)
    Cache.set(name, sound)
  }
)

export const loadConfig = (stage) => _.each(load(stage), Object.keys(Sounds))