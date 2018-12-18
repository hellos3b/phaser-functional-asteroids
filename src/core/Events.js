import * as _ from '@/utils'

export const Events = c_(
  (stage, events, entity, emit) =>
    _.findInObject(events, emit)
      .getOrElse(() => { console.warn(`No event '${emit}' found for entity:`, entity)})
      .call(null, stage, entity)
)