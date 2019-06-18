import { Http } from '../utils/http'

class ClassicModel extends Http {
  getLatest() {
    const latest = this.request({ url: '/classic/latest' })
    latest.then(res => {
      console.log(res.data)
      const index = res.data.index
      this._saveLatestIndex(index)
      const key = this._getKey(index)
      wx.setStorageSync(key, res.data.data)
    })
    return latest
  }

  

  getClassic(index, nextOrPrevious) {
    const key =
      nextOrPrevious === 'next'
        ? this._getKey(index + 1)
        : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      classic = this.request({ url: `/classic/${index}/${nextOrPrevious}` })
      classic.then(res => {
        wx.setStorageSync(this._getKey(res.data.index), res)
      })
    }
    return Promise.resolve(classic)
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
