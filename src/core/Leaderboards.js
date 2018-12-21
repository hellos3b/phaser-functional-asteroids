import * as local from '@/leaderboards/localLeaderboard'
import * as online from '@/leaderboards/onlineLeaderboard'
import * as Views from '@/views/leaderboardView'
import * as config from '@/leaderboards/config'

export const submit = async (state) => {
  const localBoard = local.submit(state)
  Views.renderLeaderboard(localBoard)

  if (config.online) {
    const onlineBoards = await online.submit(state)
    if (onlineBoards.group) {
      Views.renderLeaderboard(onlineBoards.group)  
    }
    Views.renderLeaderboard(onlineBoards.global)
  }
}

export const clearView = state => {
  document.querySelector('.leaderboard-container').innerHTML = ''
}