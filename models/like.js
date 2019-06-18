import { Http } from '../utils/http'

class LikeModel extends Http {
  like(behavior, artId, category) {
    let url = behavior === 'like' ? '/like' : '/like/cancel'

    return this.request({
      url,
      method: 'POST',
      data: {
        art_id: artId,
        type: category
      }
    })
  }

  getClassicLikeStatus(artId, category, cd) {
    return this.request({ url: `/classic/${category}/${artId}/favor` })
  }
}

export { LikeModel }
