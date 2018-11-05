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

export const getClassicLikeStatus = (artId, category, cb) => {
  request({
    url: `/classic/${category}/${artId}/favor`,
    success: data => cb(data)
  })
}