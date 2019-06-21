// pages/book-detail/book-detail.js

import { BookModel } from '../../models/book'
import { LikeModel } from '../../models/like'

const bookModel = new BookModel()
const likeModel = new LikeModel()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: {},
    isLike: false,
    likeCount: 0,
    showPost: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const bookId = options.bookId
    // 串行请求
    // const comments = await bookModel.getBookComments(bookId)
    // const detail = await bookModel.getBookDetail(bookId)
    // const likeStatus = await bookModel.getBookLikeStatus(bookId)

    wx.showLoading()

    // Promise.all 并行请求
    const result = await Promise.all([
      bookModel.getBookComments(bookId),
      bookModel.getBookDetail(bookId),
      bookModel.getBookLikeStatus(bookId)
    ])
    wx.hideLoading()

    this.setData({
      comments: result[0].data.comments,
      book: result[1].data,
      isLike: result[2].data.like_status,
      likeCount: result[2].data.fav_nums
    })
  },
  async onLike(e) {
    const behavior = e.detail.behavior
    await likeModel.like(behavior, this.data.book.id, 400)
  },

  onFakePost() {
    this.setData({ showPost: true })
  },

  onCancel() {
    this.setData({ showPost: false })
  },

  async onPost(e) {
    const comment = e.detail.text || e.detail.value
    if (!comment) {
      return
    }

    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }

    const result = await bookModel.postBookComment(this.data.book.id, comment)
    wx.showToast({
      title: '+1',
      icon: 'none'
    })

    const newComments = this.data.comments
    this.data.comments.unshift({
      content: comment,
      nums: 1
    })

    this.setData({
      comments: newComments,
      showPost: false
    })
  }
})
