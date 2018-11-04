import config from '../config'

const tip = {
  1: '抱歉，出现了一个错误！',
  1005: 'appkey错误，请去网站申请！',
  3000: '期刊错误'
}

const show_error = (error_code = 1) => {
  return wx.showToast({
    title: tip[error_code],
    icon: 'none',
    duration: 2000
  })
}


export const request = params => {
  const {
    url, method = 'GET', data = '', success = () => {
    }
  } = params
  wx.request({
    url: config.api_base_url + url,
    method: method,
    data: data,
    headers: {
      'content-type': 'application/json',
      'appkey': config.appkey
    },
    success: res => {
      const codeStr = res.statusCode.toString()
      if (codeStr.startsWith('2')) {
        success(res.data)
      } else {
        const error_code = res.data.error_code
        show_error(error_code)
      }
    },
    fail: err => {
      show_error('1')
    }
  })
}

