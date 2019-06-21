import { Http } from '../utils/http'

class ClassicModel extends Http {
  async getLatest() {
    const latest = await this.request({ url: '/classic/latest' })
    const index = latest.data.index
    this._saveLatestIndex(index)
    const key = this._getKey(index)
    wx.setStorageSync(key, latest.data.data)
    return latest
  }

  async getClassic(index, nextOrPrevious) {
    const key =
      nextOrPrevious === 'next'
        ? this._getKey(index + 1)
        : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      classic = await this.request({
        url: `/classic/${index}/${nextOrPrevious}`
      })
      wx.setStorageSync(this._getKey(classic.data.index), classic)
    }
    return classic
  }

  getMyFavoriteClassic() {
    return this.request({ url: '/classic/favor' })
  }

  getById(cid, type, success) {
    return this.request({
      url: `/classic/${type}/${cid}`
    })
  }

  isFirst(index) {
    return index === 1
  }

  isLatest(index) {
    const latestIndex = this._getLastIndex()
    return index === latestIndex
  }

  _getLastIndex() {
    return wx.getStorageSync('latestIndex')
  }

  _saveLatestIndex(index) {
    wx.setStorageSync('latestIndex', index)
  }

  _getKey(index) {
    const key = 'classic-' + index
    return key
  }
}

export { ClassicModel }
