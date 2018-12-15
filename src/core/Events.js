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
  (entity, event) =>
    entity.events 
      ? _.merge(entity, entity.events.call(null, entity, event))
      : entity
)

/*
  emit :: Entity -> Entity
  Calls entity.events() with any emit values
*/
export const emit = entity => 
  pipe(
    _.map(fireEvent),
    _.flat,
    _.merge({emit: []}),
    _.merge(entity)
  )(entity.emit)


  const updateEntity = stage => entity => 
  pipe(
    _.no("spriteId")(Stage.spawnNew(stage)),
    _.has("physicsEnabled")(Physics.apply(_.delta(stage.game))),
    _.has("input")(e => e.input(e)),
    _.length("emit")(Events.emit)
  )(entity)