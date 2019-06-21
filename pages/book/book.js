// pages/book/book.js

import { BookModel } from '../../models/book'

const bookModel = new BookModel()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    showSearch: false,
    needMore: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const bookList = await bookModel.getHotBookList()
    this.setData({
      books: bookList.data
    })
  },

  goSearch() {
    this.setData({ showSearch: true })
  },

  onCancel() {
    this.setData({ showSearch: false })
  },

  onReachBottom() {
    this.setData({ needMore: !this.data.needMore })
  }
})
