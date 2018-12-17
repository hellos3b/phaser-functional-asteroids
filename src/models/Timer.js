import * as _ from "@/utils"

export const model = () => _.Model({
  count   : 0,
  current : 0,
  loop    : false,
  done    : () => {}
})()


/*
  updateAll :: (Phaser.State, [Timer]) -> [Timer]
*/
export const updateAll = c_(
  (stage, timers) => 
    timers
      |> _.map(updateTimer(_.delta(stage.game, 1)))
      |> _.filter(timerShouldContinue)
)

/*
  updateTimer :: (Float, Timer) -> Timer
*/
const updateTimer = c_(
  (delta, timer) => timer |> addTime(delta) |> emitIfDone
)

const timerShouldContinue = timer => timer.loop || timer.current < timer.count()

/*
  addTimer :: (Float, Timer) -> Timer
*/
const addTime = c_(
  (delta, timer) => _.merge(timer, {
    current: timer.current + delta
  })
)

/*
  emitIfDone :: Timer -> Timer
*/
const emitIfDone = timer => {
  if (timer.current >= timer.count()) {
    timer.done()

    return timer.loop ? _.merge(timer, { current: 0 }) : timer
  }

  return timer
}