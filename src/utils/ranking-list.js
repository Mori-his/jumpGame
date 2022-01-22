import axios from 'axios'

const vm = new Vue({
  el: '#ranking-list',
  data: {
    list: [],
    myResult: 0,
    resultType: 1
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

      axios.request({
        url: 'http://13.232.169.180/api/search/ranking',
        method: 'GET'
      })
        .then((res) => {
          const list = res.data.data.rankingList
          this.list = list
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
