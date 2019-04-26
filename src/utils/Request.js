import qs from 'query-string'
import axios from 'axios'
import _ from 'lodash'
import { warn } from './warn'
// import Vue from 'vue'
// import { USER_JWT } from '@/constant/user'
const API_ROOT = process.env.VUE_APP_API_ROOT
let api = axios.create({
  baseURL: API_ROOT,
  headers: {
    // platform: 'h5'
  },
  // timeout: 2000,
  paramsSerializer: function (params) {
    return qs.stringify(params, { arrayFormat: 'none' })
  }
})
api.interceptors.request.use(request => {
  // use require for runtime import sotre
  // const { getters } = require('@/store').default
  // request.headers.common.platform = 'h5'
  // if (getters[USER_JWT]) {
  //   request.headers.common.Authorization = 'Bearer ' +
  //     getters[USER_JWT]
  // }
  return request
})
api.interceptors.response.use(response => {
  return response
},
function (error) {
  let error_response = error.response
  let data = error.response && error_response.data
  // let message = data && data.message
  return Promise.reject(data)
})

let seed = 0
class Request {
  constructor (options) {
    this.url = options.url
    this.name = options.name
    this.type = options.type
    this.params = options.params
    this.method = options.method || Request.GET
    // 与数据池有关
    this.data_type = options.data_type
    // 默认不允许重复请求
    this.allow_repeat = options.allow_repeat || false
    // 认定为重复请求的最小间隔
    // 如果该接口不允许重复请求的话
    // 在 1000ms 内重复接口重复参数将会被拒绝
    this.min_interval = 1000
    // define request
    Request.REQUESTS[this.name] = this
  }

  // request type
  LIST = 0
  DETAIL = 1
  UPLOAD = 2
  // request status
  LOADING = 3
  LOADED = 4
  REPEAT = 5
  // request methods
  GET = 'get'
  POST = 'post'
  PUT = 'put'
  DELETE = 'delete'
  // all define request
  REQUESTS = {}
  QUEUE = []

  // @return Promise
  send (params = {}) {
    let promise = null
    // 重复请求检测
    if (this._repeat(params)) {
      return Promise.reject(Request.REPEAT)
    }

    if (this.method === Request.GET) {
      promise = api.get(this.url, { params })
    } else {
      promise = api[this.method](this.url, params)
    }
    let id = this._add(name, params, promise)
    return promise.then(res => {
      this._remove(id)
      return res
    }).catch(error => {
      this._remove(id)
      Promise.reject(error)
    })
  }
  // 静态方法
  static send (name, params = {}) {
    return Request.REQUESTS[name].send(params)
  }

  _repeat (params) {
    if (this.allow_repeat) {
      return false
    }
    // 请求队列中是否有
    let ids = Object.keys(Request.REQUESTS)
    let repeat = false
    for (var i = ids.length - 1; i >= 0; i--) {
      let id = ids[i]
      let item = Request.REQUESTS[id]
      if (
        item.name === this.name &&
        _.isEqual(item.params, params) &&
        Date.now() - item.time < this.min_interval
      ) {
        // 如果接口名称和接口参数都相同
        // 且请求间隔小于最小间隔
        repeat = true
        warn(
          '重复请求, 请求名称:' + this.name +
          ', 请求参数:' + JSON.stringify(this.params)
        )
        break
      }
    }
    return repeat
  }
  // @return void
  // _finish () {
  // }
  // @return id
  _add (name, params, promise) {
    let id = seed++
    Request.REQUESTS[id] = {
      id,
      name,
      params,
      promise,
      time: Date.now()
    }
    return id
  }
  // @return void"
  _remove (id) {
    delete Request.REQUESTS[id]
  }
}

export default Request
