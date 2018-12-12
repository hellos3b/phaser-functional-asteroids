import { c_, Maybe } from '@/utils/functional'

// The only place where sprite values should be modified
export const modifiers = {

	setPosition: c_((sprite, state) => {
		sprite.x = state.position.x
		sprite.y = state.position.y
	}),

	setFrame: c_((sprite, state) => {
		sprite.frame = state.frame
	}),

	setAnchor: c_((sprite, state) => {
		sprite.anchor.setTo(state.anchor.x, state.anchor.y)
	})

}

/* 
  commitSpriteUpdate :: (Phaser.Sprite, State, Maybe(Function)) -> null
  Updates the sprite with all the setters to their new values
*/
export const commitSpriteUpdate = c_(
	(sprite, state, modifier) =>
		modifier
			.getOrElse(() => {})
			.call(null, sprite, state)
)

/* 
  prefixPropertyName :: String -> String
  Converts property name to a set function name, i.e. position -> setPosition
*/
export const prefixPropertyName = c_(
	str => "set" +
		str.charAt(0).toUpperCase() +
		str.substring(1)
)