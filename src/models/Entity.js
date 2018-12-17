import * as _ from "@/utils"
import { c_ } from "../utils/functional";

export const model = _.Model({
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
	collisionTargets: [],
	gravity: false,
	velocity: {
		x: 0,
		y: 0
	},
	angVelocity: 0,

	// methods
	update: c_((stage, entity) => entity)
})

/*
  die :: Entity -> Entity
*/
export const die = entity => _.merge(entity, { alive: false })

/*
  dead :: Entity -> Boolean
*/
export const dead = entity => entity.alive