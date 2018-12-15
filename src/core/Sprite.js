export const initialState = () => ({
	spriteId: null,

	// entity prop
	alive: true,

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
	velocity: {
		x: 0,
		y: 0
	},
	animations: {},
	animation: null,
	angle: 0,

	// physics
	physicsEnabled: false,
	bodyRadius: 8,
	collisionGroup: -1,
	collisionTargets: [],
	gravity: false
})