// pages/my/my.js
import { BookModel } from '../../models/book'
import { ClassicModel } from '../../models/classic'

const bookModel = new BookModel()
const classicModel = new ClassicModel()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    authorized: false,
    bookCount: 0,
    classics: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.userAuthorized()
    const bookCount = await bookModel.getMyFavoriteBookCount()
    const classics = await classicModel.getMyFavoriteClassic()
    this.setData({
      bookCount: bookCount.data.count,
      classics: classics.data
    })
  },

  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                userInfo: data.userInfo,
                authorized: true
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo(e) {
    const userInfo = e.detail.userInfo
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },

  goDetail(e) {
    const { cid, type } = e.detail
    wx.navigateTo({
      url: `/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`
    })
  }
})
