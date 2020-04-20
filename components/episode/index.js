// components/episode/index.js

Component({
  properties: {
    index: {
      type: Number,
      value: 0,
      observer(newVal, oldVal, changePath) {
        let val = newVal < 10 ? '0' + newVal : newVal
        this.setData({
          _index: val
        })
      }
    }
  },

  data: {
    monthMap: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月'
    ],
    year: '',
    month: '',
    _index: ''
  },

  attached() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    this.setData({
      year,
      month: this.data.monthMap[month]
    })
  }
})
