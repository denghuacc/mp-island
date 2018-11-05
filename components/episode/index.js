// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      value: 0,
      observer: function (newVal, oldVal, changePath) {
        let val = newVal < 10 ? '0' + newVal : newVal
        this.setData({
          _index: val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    monthMap: [
      '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
    ],
    year: '',
    month: '',
    _index: ''
  },

  lifetimes: {
    attached() {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth()
      this.setData({
        year,
        month: this.data.monthMap[month]
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {}
})
