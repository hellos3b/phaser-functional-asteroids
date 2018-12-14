export class Groups {

	constructor(game, groups) {
		let name = ""

		for (var i = 0; i < groups.length; i++) {
			name = groups[i]
			this[name] = game.add.group()
			this[name].name = name
		}
	}

}