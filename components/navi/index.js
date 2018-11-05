// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    isFirst: Boolean,
    isLatest: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    leftSrc: 'images/triangle@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    rightSrc: 'images/triangle@right.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft() {
      if (!this.properties.isLatest) {
        this.triggerEvent('left', {}, {})
      }
    },
    onRight() {
      if (!this.properties.isFirst) {
        this.triggerEvent('right', {}, {})
      }
    }
  }
})