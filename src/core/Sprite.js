import Phaser from "phaser"
import { State, pipe,  c_, Maybe } from "@/utils/functional"

import * as _ from "@/utils"

let spriteIds = 1

// Apply state -> actual sprite object
const commits = {

  setPosition: c_((sprite, { position }) => {
    sprite.x = position.x
    sprite.y = position.y
  }),

  setFrame: c_((sprite, state) => {
    sprite.frame = state.frame
  }),

  setAnchor: c_((sprite, { anchor }) => {
    sprite.anchor.setTo(anchor.x, anchor.y)
  }),

  setAnimation: c_((sprite, { frame, animation }) => {
    if (animation) {
      sprite.animations.play(animation)
    } else {
      sprite.animations.stop()
      sprite.frame = frame
    }
  }),

  setAlive: c_((sprite, {alive}) => {
    if (!alive) {
      sprite.destroy()
    }
  }),
  
  setAngle: c_((sprite, { angle }) => {
    sprite.angle = angle
  }),

  setBodyRadius: c_((sprite, { physicsEnabled, bodyRadius }) => {
    if (physicsEnabled) {
      sprite.body.setCircle(
        bodyRadius,    
        (-bodyRadius + 0.5 * sprite.width  / sprite.scale.x),
        (-bodyRadius + 0.5 * sprite.height / sprite.scale.y)
      )
    }
  })

}

/* 
  loadAnimations :: (Phaser.Sprite, Object) -> null
*/
const loadAnimations = c_(
  (sprite, animations) => 
      _.objMap(
        (key, value) => loadAnimation(sprite, key, value), 
        animations
      )
)

/* 
  loadAnimations :: (Phaser.Sprite, String, Object) -> null
*/
const loadAnimation = c_(
  (sprite, name, animation) => {
    const anim = sprite.animations.add(
      name,
      animation.frames,
      animation.fps,
      animation.loop
    ) 

    // Animation events
    animation.onDone && anim.onComplete.add(() => emitEvent(sprite, animation.onDone))
  }
)

const emitEvent = c_(
  (sprite, event) => sprite.eventQueue = _.push(sprite.eventQueue, event)
)

/* 
  commitSpriteUpdate :: (Phaser.Sprite, State, Maybe(Function)) -> null
  Updates the sprite with all the setters to their new values
*/
const commitSpriteUpdate = c_(
  (sprite, state, committer) =>
    committer
      .getOrElse(() => {})
      .call(null, sprite, state)
)

/* 
  prefixPropertyName :: String -> String
  Converts property name to a set function name, i.e. position -> setPosition
*/
const prefixPropertyName = str => 
  "set" +
    str.charAt(0).toUpperCase() +
    str.substring(1)

const updateProperty = c_(
  (sprite, state, key) => key
    |> prefixPropertyName
    |> _.findInObject(commits)
    |> commitSpriteUpdate(sprite, state)
)

/*
  Wrapper for Phaser.Sprite
  allows commiting a state and auto-running sprite functions based on the diff
*/
export class Sprite extends Phaser.Sprite {

  constructor (game, props) {
    super(
      game, 
      props.position.x, 
      props.position.y, 
      props.asset
    )

    this.id = spriteIds++
    this.game = game
    this.eventQueue = []
    const state = this.state = new State(props)

    // this is to prevent race conditions of other properties
    if (state.physicsEnabled) {
        this.game.physics.arcade.enable(this)
        this.enableBody = true
    }

    loadAnimations(this, state.animations)

    this.commit(state, Object.keys(state))
  }

  getEventQueue() {
    const eventQueue = this.eventQueue
    this.eventQueue = []
    return eventQueue
  }

  commit(state, keys) {
    this.state.$commit(state)
    keys = keys || this.state.$dirty
    keys.forEach( k => updateProperty(this, this.state, k) )
    this.state.$clean()
    return state
  }
}
