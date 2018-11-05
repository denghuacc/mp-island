import { getClassic, getLatest, isFirst, isLatest } from '../../models/classic'
import { getClassicLikeStatus, like } from '../../models/like'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: {},
    isFirst: false,
    isLatest: true,
    likeStatus: 0,
    likeCount: 0
  },

  onLike(e) {
    let behavior = e.detail.behavior
    console.log(behavior)
    like(behavior, this.data.classic.id, this.data.classic.type)
  },

  onPrevious() {
    this._updateClassic('previous')
  },
  onNext() {
    this._updateClassic('next')
  },

  _updateClassic(nextOrPrevious) {
    getClassic(this.data.classic.index, nextOrPrevious, data => {
      this._getLikeStatus(data.id, data.type)
      this.setData({
        classic: data,
        isLatest: isLatest(data.index),
        isFirst: isFirst(data.index)
      })
    })
  },

  _getLikeStatus(artId, category) {
    getClassicLikeStatus(artId, category, data => {
      this.setData({
        likeStatus: data.like_status,
        likeCount: data.fav_nums
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    getLatest(data => {
      this.setData({
        classic: data,
        likeStatus: data.like_status,
        likeCount: data.fav_nums
      })
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})