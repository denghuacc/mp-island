// pages/classic/classic.js

import { createClassicModel } from '../../models/classic'
import { createLikeModel } from '../../models/like'

const likeModel = createLikeModel()
const classicModel = createClassicModel()

Component({
  properties: {
    cid: Number,
    type: Number,
    needNavi: {
      type: Boolean,
      value: true
    }
  },
  data: {
    classic: {},
    isFirst: false,
    isLatest: true,
    likeStatus: 0,
    likeCount: 0
  },

  async attached(options) {
    const cid = this.properties.cid
    const type = this.properties.type
    if (!cid) {
      const classic = await classicModel.getLatest()
      this.setData({
        classic: classic.data,
        likeCount: classic.data.fav_nums,
        likeStatus: classic.data.like_status
      })
    } else {
      const classic = await classicModel.getById(cid, type)
      this._getLikeStatus(classic.data.id, classic.data.type)
      this.setData({
        classic: classic.data,
        latest: classicModel.isLatest(classic.data.index),
        first: classicModel.isFirst(classic.data.index)
      })
    }
  },

  methods: {
    async handleLike(e) {
      const behavior = e.detail.behavior
      await likeModel.like(
        behavior,
        this.data.classic.id,
        this.data.classic.type
      )
    },

    async handlePrevious() {
      await this._updateClassic('previous')
    },

    async handleNext() {
      await this._updateClassic('next')
    },

    async _updateClassic(nextOrPrevious) {
      const index = this.data.classic.index
      const classic = await classicModel.getClassic(index, nextOrPrevious)
      this._getLikeStatus(classic.data.id, classic.data.type)
      this.setData({
        classic: classic.data,
        isLatest: classicModel.isLatest(classic.data.index),
        isFirst: classicModel.isFirst(classic.data.index)
      })
    },

    async _getLikeStatus(artId, category) {
      const status = await likeModel.getClassicLikeStatus(artId, category)
      this.setData({
        likeStatus: status.data.like_status,
        likeCount: status.data.fav_nums
      })
    }
  }
})
