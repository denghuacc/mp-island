// components/tag/index.js
Component({
  // 选项
  options: {
    multipleSlots: true
  },

  // 外部样式类
  externalClasses: ['tag-class'],

  properties: {
    text: String
  },

  methods: {
    handleTap() {
      this.triggerEvent('tapping', { text: this.properties.text })
    }
  }
})
