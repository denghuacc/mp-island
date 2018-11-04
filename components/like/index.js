// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLike: {
      type: Boolean
    },
    count: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    likePng: 'images/like.png',
    disLikePng: 'images/like_dis.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike() {
      const count = this.properties.count
      const isLike = this.properties.isLike
      const newCount = isLike ? count - 1 : count + 1
      this.setData({
        count: newCount,
        isLike: !isLike
      })
      let behavior = isLike ? 'cancel' : 'like'
      this.triggerEvent('like', {
        behavior
      }, {})
    }
  }
})