import axios from 'axios'

const vm = new Vue({
  el: '#ranking-list',
  data: {
    list: [],
    myResult: 0,
    finished: false,
    resultType: 1
  },

  computed: {
    myRanking() {
      const { list, myResult } = this

      const rankingList = list.map(item => {
        return item.result
      })

      console.log('ranking:', rankingList.indexOf(myResult))

      return rankingList.indexOf(myResult)
    }
  },

  methods: {
    onRestart() {
      window.location.reload()
    },

    /**
     * @param {string | number} result - 成绩
     * @param {number} type - 类型
     */
    renderRankingList(result, type) {
      this.myResult = result
      this.resultType = type

      document.querySelector('#mainCanvas').style = "display: none;"

      axios.request({
        url: 'http://13.232.169.180/api/search/ranking',
        method: 'GET'
      })
        .then((res) => {
          const list = res.data.data.rankingList
          this.list = list
          this.finished = true
        })
        .catch(() => {
          this.finished = true
        })
    }
  }
})

/**
 * @param {string | number} result - 成绩
 * @param {number} type - 类型
 */
export const renderRankingList = (result, type) => {
  vm.renderRankingList(result, type)
}

/**
 * @param {string | number} result - 成绩
 */
export const save = async (result) => {
  return await axios.request({
    url: 'http://13.232.169.180/api/save',
    method: 'GET',
    params: {
      result
    }
  })
}
