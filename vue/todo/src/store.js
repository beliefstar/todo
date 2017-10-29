/**
 * Created by zhenxin on 2017/10/2.
 */
let KEY = 'ZZZX'

export default {

  update (todos) {
    localStorage.setItem(KEY, JSON.stringify(todos))
  },
  select () {
    return JSON.parse(localStorage.getItem(KEY)) || []
  }
}
