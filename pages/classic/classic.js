import { ClassicModel } from '../../models/classic'
import { LikeModel } from '../../models/like'

const likeModel = new LikeModel()
const classicModel = new ClassicModel()

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

  attached(options) {
    const cid = this.properties.cid
    const type = this.properties.type
    console.log(cid, type)
    if (!cid) {
      classicModel.getLatest().then(res => {
        this.setData({
          classic: res.data,
          likeCount: res.data.fav_nums,
          likeStatus: res.data.like_status
        })
      })
    } else {
      classicModel.getById(cid, type).then(res => {
        this._getLikeStatus(res.data.id, res.data.type)
        this.setData({
          classic: res.data,
          latest: classicModel.isLatest(res.data.index),
          first: classicModel.isFirst(res.data.index)
        })
      })
    }
  },

  methods: {
    onLike(e) {
      const behavior = e.detail.behavior
      likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
    },

    onPrevious() {
      this._updateClassic('previous')
    },

    onNext() {
      this._updateClassic('next')
    },

    _updateClassic(nextOrPrevious) {
      const index = this.data.classic.index
      const classic = classicModel.getClassic(index, nextOrPrevious)
      classic.then(res => {
        this._getLikeStatus(res.data.id, res.data.type)
        this.setData({
          classic: res.data,
          isLatest: classicModel.isLatest(res.data.index),
          isFirst: classicModel.isFirst(res.data.index)
        })
      })
    },

    _getLikeStatus(artId, category) {
      const status = likeModel.getClassicLikeStatus(artId, category)
      status.then(res => {
        this.setData({
          likeStatus: res.data.like_status,
          likeCount: res.data.fav_nums
        })
      })
    }
  }
})
