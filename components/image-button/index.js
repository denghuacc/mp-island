// components/image-button/index.js

Component({
  options: {
    multipleSlots: true
  },

  properties: {
    openType: {
      type: String
    }
  },

  methods: {
    handleGetUserInfo(e) {
      this.triggerEvent('getuserinfo', e.detail)
    }
  }
})
