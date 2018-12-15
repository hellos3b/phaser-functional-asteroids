import * as _ from '@/utils'
import { pipe } from '../utils/functional';
import { EEXIST } from 'constants';

export const Events = c_(
  (stage, events, entity, emit) =>
    _.findInObject(events, emit)
      .getOrElse(() => {})
      .call(null, stage, entity)
)

const fireEvent = c_(
  (entity, event) =>  {
    console.log("fireEvent", entity, event)
    return entity.events 
      ? _.merge(entity, entity.events.call(null, entity, event))
      : entity
  }
)

/*
  emit :: Entity -> Entity
  Calls entity.events() with any emit values
*/
export const emit = entity => 
  pipe(
    _.map(fireEvent(entity)),
    _.flat,
    _.merge(entity),
    _.mergeIn({emit: []}),
    _.log("entity emit")
  )(entity.emit)