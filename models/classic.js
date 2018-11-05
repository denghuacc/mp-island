import { request } from '../utils/http'

export const getLatest = cb => {
  request({
    url: '/classic/latest',
    success: data => {
      cb(data)
      saveLatestIndex(data.index)
      wx.setStorageSync(setKey(data.index), data)
    }
  })
}

export const getClassic = (index, nextOrPrevious, cb) => {
  const newIndex = nextOrPrevious === 'next' ? index + 1 : index - 1
  const key = setKey(newIndex)
  const storage = wx.getStorageSync(key)
  if (!storage) {
    request({
      url: `/classic/${index}/${nextOrPrevious}`,
      success: data => {
        cb(data)
        wx.setStorageSync(setKey(data.index), data)
      }
    })
  } else {
    cb(storage)
  }
}

export const isFirst = index => index === 1

export const isLatest = index => {
  const latestIndex = getLastIndex()
  return index === latestIndex
}

const saveLatestIndex = index => wx.setStorageSync('latestIndex', index)

const getLastIndex = () => wx.getStorageSync('latestIndex')

const setKey = index => 'classic-' + index