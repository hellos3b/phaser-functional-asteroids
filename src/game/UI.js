import * as Audio from '@/core/Audio'
import * as Stage from '@/core/Stage'
import * as Styles from '@/config/styles'
import * as _ from '@/utils'
import * as Timer from '@/models/Timer'
import * as V2 from '@/utils/Vector2'
import * as Leaderboards from '@/core/Leaderboards'

const SPEED_BONUS = 20

export const create = stage => {
  stage.$refs.score = stage.game.add.text(20, 20, 0, Styles.Score)
  stage.$refs.bonus = stage.game.add.text(20, 46, 0, Styles.Bonus)
}

export const update = stage => {
  const bonus = getCurrentBonus(stage)
  stage.$refs.score.text = getScoreString(stage)
  stage.$refs.bonus.text = toBonusString(bonus)

  let bonusColor = "#666"
  if(bonus > 19) {
    bonusColor = "#e51ee9"
  } else if (bonus > 15) {
    bonusColor="#48ce27"
  } else if (bonus > 10) {
    bonusColor="#20381a"
  }

  stage.$refs.bonus.addColor(bonusColor, 0)
}

const showEndText = c_(
  (stage, style, y, text) => {
    const textSprite = stage.game.add.text(0, y, text, style)
    textSprite.setTextBounds(0, 0, stage.game.width, 100)
  }
)

// Slam effect when showing score
const slamUI = stage => {
  Audio.play("boost")
  stage.game.camera.shake(0.04, 120)
}

// Shows "SCORE"
const endTitleTimer = stage => 
  Timer.create({
    count	: () => 1500 / 1000,
    done	: () => {
      slamUI(stage)
      showEndText(stage, Styles.scoreTitle, 50,  "SCORE")
    }
  })

// Shows actual score
const endScoreTimer = stage => 
  Timer.create({
    count	: () => 2000 / 1000,
    done	: () => {
      slamUI(stage)
      getScoreString(stage) |> showEndText(stage, Styles.scoreText, 86)
    }
  })

// Shows Flips, time etc stats
const endStatsTimer = stage => 
  Timer.create({
    count	: () => 2500 / 1000,
    done	: () => showEndStats(stage)
  })

const showEndStats = c_(
  (stage) => {
    showEndText(stage, Styles.restartText, 140, "Press [F] to restart")
    statElement(stage, -140, "JUMPS", stage.$state.jumps)
    statElement(stage, 0, "TIME", _.mmss(stage.$state.elapsedTime))
    statElement(stage, 140, "FLIPS", stage.$state.flips)
    Leaderboards.submit(stage.$state)
  }
)

const statElement = (stage, offsetX, name, val) => {
  const width = 100
  const titleSprite = stage.game.add.text(0, 0, name, Styles.statTitle)
  titleSprite.setTextBounds(
    stage.game.world.centerX + offsetX - (width/2), 
    210,
    width, 
    100
  )
  const detailSprite = stage.game.add.text(0, 0, val, Styles.statDetail)
  detailSprite.setTextBounds(
    stage.game.world.centerX + offsetX - (width/2), 
    180,
    width, 
    100
  )
}

const centeredText = c_(
  (x, y, width, text, style) => {
    const textSprite = stage.game.add.text(0, 0, text, style)
    textSprite.setTextBounds(x, y, width, 0)    
    return text
  }
)

export const showFinalScore = stage => {
  Stage.addTimer(stage, endTitleTimer(stage))
  Stage.addTimer(stage, endScoreTimer(stage))
  Stage.addTimer(stage, endStatsTimer(stage))
}

export const getCurrentBonus = stage => 
  V2.magnitude(stage.$refs.player.velocity)
    |> _.toLerp(100, 400) 
    |> _.lerp(0, SPEED_BONUS)

const toBonusString = bonus => 'x' + Math.floor(bonus)
const getScoreString = stage => Math.floor(stage.$state.score) |> _.numberCommas
