import { Http } from '../utils/http'

class BookModel extends Http {
  getHotBookList() {
    return this.request({
      url: '/book/hot_list'
    })
  }

  getBookDetail(bookId) {
    return this.request({
      url: `/book/${bookId}/detail`
    })
  }

  getBookComments(bookId) {
    return this.request({
      url: `/book/${bookId}/short_comment`
    })
  }

  getBookLikeStatus(bookId) {
    return this.request({
      url: `/book/${bookId}/favor`
    })
  }

  postComment(bookId, comment) {
    return this.request({
      url: '/book/add/short_comment',
      method: 'POST',
      data: {
        book_id: bookId,
        content: comment
      }
    })
  }

  searchBook(keyword, start) {
    return this.request({
      url: '/book/search?summary=1',
      data: {
        keyword,
        start
      }
    })
  }
}

export { BookModel }
