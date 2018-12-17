/*
    Stolen from a github gist
    https://gist.github.com/Dalimil/3daf2a0c531d7d030deb37a7bfeff454
*/
import * as Utils from '@/utils'

function Vector2(x, y) {
	this.x = (x === undefined) ? 0 : x;
	this.y = (y === undefined) ? 0 : y;
}

Vector2.prototype = {
	set: function(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	},

	clone: function() {
		return new Vector2(this.x, this.y)
	},

	add: function(vector) {
		return new Vector2(this.x + vector.x, this.y + vector.y);
	},

	subtract: function(vector) {
		return new Vector2(this.x - vector.x, this.y - vector.y);
	},

	multiply: function(val) {
		return new Vector2(this.x*val, this.y*val)
	},

	divide: function(val) {
		return new Vector2(this.x/val, this.y/val)
	},

	scale: function(scalar) {
		return new Vector2(this.x * scalar, this.y * scalar);
	},

	dot: function(vector) {
		return (this.x * vector.x + this.y * vector.y);
	},

	moveTowards: function(vector, t) {
		// Linearly interpolates between vectors A and B by t.
		// t = 0 returns A, t = 1 returns B
		t = Math.min(t, 1); // still allow negative t
		var diff = vector.subtract(this);
		return this.add(diff.scale(t));
	},

	magnitude: function() {
		return Math.sqrt(this.magnitudeSqr());
	},

	magnitudeSqr: function() {
		return (this.x * this.x + this.y * this.y);
	},

	distance: function (vector) {
		return Math.sqrt(this.distanceSqr(vector));
	},

	distanceSqr: function (vector) {
		var deltaX = this.x - vector.x;
		var deltaY = this.y - vector.y;
		return (deltaX * deltaX + deltaY * deltaY);
	},

	normalize: function() {
		const length = this.magnitude()
		return new Vector2(
			this.x/length,
			this.y/length
		)
	},

	angle: function() {
		return Math.atan2(this.y, this.x);
	},

	angleBetween: function(vec) {
		return this.angle() - vec.angle()
	},

	rotate: function(alpha) {
		var cos = Math.cos(alpha);
		var sin = Math.sin(alpha);
		var vector = new Vector2();
		vector.x = this.x * cos - this.y * sin;
		vector.y = this.x * sin + this.y * cos;
		return vector;
	},

	toPrecision: function(precision) {
		var vector = this.clone();
		vector.x = vector.x.toFixed(precision);
		vector.y = vector.y.toFixed(precision);
		return vector;
	},

	perpRight: function () {
		return new Vector2(-this.y, this.x)
	},

	toString: function () {
		var vector = this.toPrecision(1);
		return ("[" + vector.x + "; " + vector.y + "]");
	}
};

export { Vector2 }

// Static methods
// (better in a functional setting)
export const directionTowards = c_(
	(position, target) =>
		new Vector2(target.x, target.y)
			.subtract(new Vector2(position.x, position.y))
)

export const fromAngle = angle => new Vector2(0, 1).rotate(Utils.toRadians(angle))

export const multiply = c_(
	(amount, v) => v.multiply(amount)
)

export const toTarget = c_(
	(position, target) => directionTowards(position, target).normalize()
)

export const normalize = v => v.normalize()

export const add = c_(
	(v, v2) => new Vector2(v.x, v.y).add(v2)
)

export const magnitude = v => new Vector2(v.x, v.y).magnitude

export const clamp = c_(
	(max, v) => {
		v = new Vector2(v.x, v.y)
		return (v.magnitude() > max) ? v.normalize().multiply(max) : v
	}
)

export const json = v => ({ x: v.x, y: v.y })