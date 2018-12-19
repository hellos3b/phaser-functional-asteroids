export default {
  // entity prop
  alive: true,
  events: null,

  asset: '',
  frame: 0,
  position: {
    x: 0,
    y: 0
  },
  anchor: {
    x: 0.5,
    y: 0.5
  },
  animations: {},
  animation: null,
  angle: 0,

  // physics
  physicsEnabled: false,
  bodyRadius: 8,
  collisionGroup: -1,
  collisions: {},
  gravity: false,
  velocity: {
    x: 0,
    y: 0
  },
  angVelocity: 0
}