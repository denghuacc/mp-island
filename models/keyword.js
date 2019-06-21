import { Http } from '../utils/http'

class KeywordModel extends Http {
  key = 'searchHistory'
  maxLength = 10

  getHistoryWords() {
    const words = wx.getStorageSync(this.key)
    if (!words) {
      return []
    }
    return words
  }

  getHotWords() {
    return this.request({ url: '/book/hot_keyword' })
  }

  addToHistoryWords(keyword) {
    let words = this.getHistoryWords()
    const exist = words.includes(keyword)

    if (!exist) {
      if (words.length >= this.maxLength) {
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }
  }
}

export { KeywordModel }
