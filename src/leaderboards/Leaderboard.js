const MAX_COUNT = 10

export const Board = function (leaderboard) {
  this.title = leaderboard.title
  this.entries = leaderboard.entries.sort(scoreSort)

  this.add = entry => {
    this.entries = addEntry(this.entries, entry)
  }

  this.highScore = entry => {
    return this.entries.length < MAX_COUNT || isHighScore(this.entries, entry)
  }
}

export const entryFromState = state => {
  return { 
    newEntry: true,
    name    : "YOU",
    score   : Math.floor(state.score),
    elapsed : state.elapsedTime,
    flips   : state.flips,
    start   : state.startTime,
    end     : state.endTime
  }
}

const addEntry = (leaderboard, entry) => {
  leaderboard.push(entry)
  return leaderboard.sort(scoreSort).slice(0, MAX_COUNT)
}

const isHighScore = (leaderboard, entry) => entry.score > leaderboard[leaderboard.length - 1].score

const scoreSort = (a, b) => {
  if (a.score > b.score) return -1
  if (a.score < b.score) return 1
  return 0
}