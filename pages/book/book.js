// pages/book/book.js

import { BookModel } from '../../models/book'

const bookModel = new BookModel()

Page({
  data: {
    books: [],
    showSearch: false,
    needMore: false
  },

  async onLoad(options) {
    const bookList = await bookModel.getHotBookList()
    this.setData({
      books: bookList.data
    })
  },

  onReachBottom() {
    this.setData({ needMore: !this.data.needMore })
  },

  goToSearch() {
    this.setData({ showSearch: true })
  },

  handleCancel() {
    this.setData({ showSearch: false })
  }
})
