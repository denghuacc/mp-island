// components/book/index.js

Component({
  properties: {
    book: Object
  },

  methods: {
    goToDetailPage() {
      const bookId = this.properties.book.id
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?bookId=${bookId}`
      })
    }
  }
})
