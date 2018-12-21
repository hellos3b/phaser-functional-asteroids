import { renderLeaderboard } from "../views/leaderboardView"
import * as Leaderboard from "@/leaderboards/Leaderboard"

const saveLeaderboard = leaderboard => {
  localStorage.setItem("local-leaderboard", JSON.stringify(leaderboard))
  return leaderboard
}

const loadLeaderboard = () => {
  let leaderboard = JSON.parse(localStorage.getItem("local-leaderboard"))
  if (!leaderboard) leaderboard = []

  return new Leaderboard.Board({
    title: "Local",
    entries: leaderboard.map( n => { n.newEntry = false; return n; })
  })
}

export const submit = state => {
  let leaderboard = loadLeaderboard()
  const entry = Leaderboard.entryFromState(state)

  if (leaderboard.highScore(entry)) {
    leaderboard.add(entry)
    saveLeaderboard(leaderboard.entries)
  }
  
  return leaderboard
}