import { request } from '../utils/http'

export const like = (behavior, artId, category) => {
  let url = behavior === 'like' ? '/like' : '/like/cancel'

  request({
    url,
    method: 'POST',
    data: {
      art_id: artId,
      type: category
    }
  })
}