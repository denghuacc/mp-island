// components/search/index.js

import { KeywordModel } from '../../models/keyword'
import { BookModel } from '../../models/book'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    needMore: { type: Boolean, observer: 'loadMore' }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searchResult: [],
    hasSearch: false,
    keyword: '',
    hasMore: true, // 是否还是数据
    canFetch: true, // 能否发生请求 => 每次请求后不管成功与否，都要解锁
    showLoadingCenter: false,
    noResult: false
  },

  async attached() {
    const historyWords = keywordModel.getHistoryWords()
    const hotWords = await keywordModel.getHotWords()
    this.setData({ historyWords, hotWords: hotWords.data.hotKeywords })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel() {
      this.triggerEvent('cancel')
    },

    async goSearching(e) {
      this.setData({ hasSearch: true })

      let keyword = e.detail.value || e.detail.text

      if (!keyword) {
        return
      }

      keyword = keyword.trim()

      this.setData({ keyword, showLoadingCenter: true })
      const searchResult = await bookModel.searchBook(keyword, 0)
      keywordModel.addToHistoryWords(keyword)

      if (searchResult.data.books.length === 0) {
        this.setData({ noResult: true })
      }

      this.setData({
        searchResult: searchResult.data.books,
        showLoadingCenter: false
      })
    },

    // 退出搜索界面（ hasSearch 为 false ）时需要重置一些属性
    // 再次进入搜索的时候才能正常搜索
    // onCancel 再进来的时候会重新生成属性，所有可以不用重置
    onDelete(e) {
      this.setData({
        hasSearch: false
      })
      this.initializeData()
    },

    initializeData() {
      this.setData({
        searchResult: [],
        keyword: '',
        hasMore: true,
        canFetch: true,
        noResult: false
      })
    },

    async loadMore() {
      try {
        const keyword = this.data.keyword
        if (!keyword || !this.data.canFetch || !this.data.hasMore) {
          return
        }

        this.setData({ canFetch: false }) // 加锁

        const moreResponse = await bookModel.searchBook(
          keyword,
          this.data.searchResult.length
        )

        const newSearchResult = this.data.searchResult.concat(
          moreResponse.data.books
        )

        // await 异步阻塞
        await this.setData({
          searchResult: newSearchResult,
          canFetch: true // 请求数据成功后解锁
        })

        this.setData({ canFetch: true }) //

        if (this.data.searchResult.length >= moreResponse.data.total) {
          this.setData({
            hasMore: false
          })
        }
      } catch (error) {
        this.setData({ canFetch: true }) // 请求数据失败后 (断网等) 也要解锁
      }
    }
  }
})
