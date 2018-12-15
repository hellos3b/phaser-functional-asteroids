import * as _ from "@/utils"

export const model = _.Model({
	// entity prop
	alive: true,
	emit: [],
	events: name,

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
	collisionTargets: [],
	gravity: false,
	velocity: {
		x: 0,
		y: 0
	},
	angVelocity: 0
})

/*
  die :: Entity -> Entity
*/
export const die = entity => _.merge(entity, { alive: false })

/*
  dead :: Entity -> Boolean
*/
export const dead = entity => entity.alive