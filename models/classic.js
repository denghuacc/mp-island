import { request } from '../utils/http'

export const getLatest = cb => {
  request({
    url: '/classic/latest',
    success: data => cb(data)
  })
}