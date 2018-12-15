import * as _ from '@/utils'
import * as Physics from '@/core/Physics'
import {initialState} from '@/core/Sprite'

export const Spaceship = () => _.deepMerge(
	initialState(),
	{
		state: {
			boostSpeed: 400,
			rotateSpeed: 270,
			rotationSinceLastBoost: 0
		},
		
		// sprite
		asset: 'spaceship',
		frame: 0,
		animations: {
			boost: {
				frames: [1, 2, 3, 4],
				loop: true,
				fps: 10
			}
		},
		animation: null,
		angle: 0,

		// Physics
		physicsEnabled: true,
		bodyRadius: 8,
		collisionGroup: Physics.CollisionGroups.Spaceship,
		collisionTargets: [
			Physics.CollisionGroups.Asteroid
		],
		gravity: true
	})