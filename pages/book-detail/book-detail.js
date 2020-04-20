// pages/book-detail/book-detail.js

import { createBookModel } from '../../models/book'
import { createLikeModel } from '../../models/like'

const bookModel = createBookModel()
const likeModel = createLikeModel()

Page({
  data: {
    comments: [],
    book: {},
    isLike: false,
    likeCount: 0,
    showPost: false
  },

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

  async handleLike(e) {
    const behavior = e.detail.behavior
    await likeModel.like(behavior, this.data.book.id, 400)
  },

  handleFakePost() {
    this.setData({ showPost: true })
  },

  handleCancel() {
    this.setData({ showPost: false })
  },

  async handlePost(e) {
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
