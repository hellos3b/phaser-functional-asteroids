import * as Views from "../views/leaderboardView";
import * as Leaderboard from "@/leaderboards/Leaderboard"
import * as Input from '@/core/Input'
import * as config from '@/leaderboards/config'

const loadLeaderboards = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const group = urlParams.get('g') || ''
  let leaderboard = await fetch(config.url()+config.get()+`?g=${group}`)
  return await leaderboard.json()
}

const postScore = async (entry) => {
  console.log("postScore", entry)
  const urlParams = new URLSearchParams(window.location.search);
  const group = urlParams.get('g') || ''

  fetch(config.url()+config.post()+`?g=${group}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(entry), // body data type must match "Content-Type" header
  })
}

export const submit = async state => {
  let leaderboards = await loadLeaderboards()
  let entry = Leaderboard.entryFromState(state)

  leaderboards.global = new Leaderboard.Board(leaderboards.global)

  if (leaderboards.group) {
    leaderboards.group = new Leaderboard.Board(leaderboards.group)
  }

  let success = leaderboards.global.highScore(entry)
  if(leaderboards.group) {
    if(leaderboards.group.highScore(entry)) {
      success = true
    }
  }

  if (success) {
    Input.disable()
    const name = await Views.promptName()
    Input.enable()
    if (name) {
      entry.name = name
      entry = config.p(entry)
      
      leaderboards.global.add(entry)
      if (leaderboards.group) {
        leaderboards.group.add(entry)
      }

      postScore(entry)
    }
  }

  return leaderboards
}