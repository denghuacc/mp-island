// components/like/index.js

Component({
  properties: {
    isLike: {
      type: Boolean
    },
    count: {
      type: Number
    },
    readOnly: {
      type: Boolean,
      value: false
    }
  },

  data: {
    likePng: 'images/like.png',
    disLikePng: 'images/like@dis.png'
  },

  methods: {
    handleLike() {
      if (this.data.readOnly) {
        return
      }
      const count = this.properties.count
      const isLike = this.properties.isLike
      const newCount = isLike ? count - 1 : count + 1
      this.setData({
        count: newCount,
        isLike: !isLike
      })
      let behavior = isLike ? 'cancel' : 'like'
      this.triggerEvent(
        'like',
        {
          behavior
        },
        {}
      )
    }
  }
})
