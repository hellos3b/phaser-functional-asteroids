import * as _ from '@/utils'
import * as Physics from '@/core/Physics'
import * as Entity from '@/core/Entity'

export const updateEntities = stage => 
  stage.$state.gameObjects
    |> _.filter(Entity.spawned)
    |> _.each(updateEntity)

export const updateEntity = entity => entity
  |> _.has("physicsEnabled") (Physics.apply(_.delta(entity.stage.game)))
  |> (e => e.update(e))
  |> Entity.commitToSprite
  // |> _.has("events") (fireSpriteEvents)
  // |>  _.has("physicsEnabled") (Physics.testCollisions(stage))