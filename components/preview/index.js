// components/preview/index.js

Component({
  properties: {
    classic: {
      type: Object,
      observer: function(newVal) {
        let typeText,
          type = newVal.type
        if (newVal) {
          const typeObj = {
            100: '电影',
            200: '音乐',
            300: '句子'
          }
          typeText = typeObj[type]
        }
        this.setData({
          typeText
        })
      }
    }
  },

  methods: {
    handleTap(e) {
      this.triggerEvent('tapping', {
        cid: this.properties.classic.id,
        type: this.properties.classic.type
      })
    }
  }
})
