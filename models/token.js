import { config } from '../config'

class Token {
  constructor() {
    this.verifyUrl = config.api_base_url + '/token/verify'
    this.tokenUrl = config.api_base_url + '/token'
  }

  // 验证 token
  verify() {
    const token = wx.getStorageSync('token')
    if (!token) {
      this.getTokenFromServer()
    } else {
      this._verifyFromServer(token)
    }
  }

  _verifyFromServer(token) {
    const that = this
    wx.request({
      url: that.verifyUrl,
      method: 'POST',
      data: {
        token
      },
      success: res => {
        const valid = res.data.data.is_valid
        if (!valid) {
          that.getTokenFromServer()
        }
      }
    })
  }

  // 从服务端获取 token
  getTokenFromServer(cb) {
    const that = this
    wx.login({
      success: res =>
        wx.request({
          url: that.tokenUrl,
          method: 'POST',
          data: {
            account: res.code,
            type: 100
          },
          success: res => {
            wx.setStorageSync('token', res.data.data.token)
            cb && cb(res.data.data.token) // 请求成功后回调
          }
        })
    })
  }
}

export { Token }
