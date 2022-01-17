/**
 * @param {string | number} result - 成绩
 */
export const renderRankingList = (result) => {
  const vm = new Vue({
    el: '#ranking-list',
    data: {
      list: ['789', '677', '588', '241', '125']
    }
  })
}
