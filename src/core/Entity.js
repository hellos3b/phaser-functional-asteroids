import State from '@/utils/State'
import * as Stage from '@/core/Stage'
import { Sprite } from '@/core/Sprite'
import * as _ from '@/utils'

const defaultProps = () => ({
  // entity prop
  alive       : true,
  events      : {},

  asset       : '',
  frame       : 0,
  position    : { x: 0, y: 0 },
  anchor      : { x: 0.5, y: 0.5 },
  animations  : {},
  animation   : null,
  angle       : 0,

  // physics
  // todo: component? :thonk:
  physicsEnabled  : false,
  bodyRadius      : 8,
  collisionGroup  : -1,
  collisions      : {},
  gravity         : false,
  velocity        : { x: 0, y: 0 },
  angVelocity     : 0
})

export class Entity {
  constructor(props) {
    this.state = new State({
      ...defaultProps(), 
      ...props
    })

    this.sprite = null

    loadProps(this, this.state)
  }

  create(/*entity*/) {

  }

  update(/*entity*/) {
    return this
  }

  emit(event) {
    if (this.state.events[event] !== undefined) {
      return this.state.events[event].call(null, this)
    } else {
      console.warn(`No event listeners for event '${event}' in Object<Entity>`)
      return this
    }
  }

  $spawn(stage) {
    this.stage = stage
    this.sprite = new Sprite(this, stage.game, this.state)
    Stage.addToScene(stage.game, this.sprite)
    Stage.addToGroup(stage, this.sprite)

    this.create(this)
    return this
  }

  $commit(props) {
    this.state.$commit(props)
    return this
  }
}

// loadProps :: (Entity2, State) => None
//  loads passed in props as getters on the object
const loadProps = (ref, state) => 
  _.each(propName => addProperty(ref, propName), Object.keys(state))

// addProperty :: (Entity2, String) => None
const addProperty = (ref, name) => 
  Object.defineProperty(ref, name, {
    get() {
      if (ref.state[name] === undefined) {
        throw new Error(`No prop named '${name}' on object<Entity>`)
      }
      return ref.state[name]
    },
    set(val) { throw new Error(`Object<Entity> is set to read-only > set '${name}' to '${val}'`) }
  })

export const spawned = entity => !!entity.sprite 

export const commitToSprite = entity => {
  entity.sprite.commit(entity.state)
  return entity
}

export const dead = e => !e.alive
export const die = e => e.$commit({ alive: false })