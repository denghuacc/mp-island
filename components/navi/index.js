// components/navi/index.js
Component({
  properties: {
    title: String,
    isFirst: Boolean,
    isLatest: Boolean
  },

  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    leftSrc: 'images/triangle@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    rightSrc: 'images/triangle@right.png'
  },

  methods: {
    handleLeft() {
      if (!this.properties.isLatest) {
        this.triggerEvent('left', {}, {})
      }
    },
    handleRight() {
      if (!this.properties.isFirst) {
        this.triggerEvent('right', {}, {})
      }
    }
  }
})
