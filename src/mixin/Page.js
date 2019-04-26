function isAllTrue (array) {
  // some() 方法测试是否至少有一个元素通过由提供的函数实现的测试。
  // 全部未通过返回false
  return !array.some(i => !i)
}
export default function ({ init_requests }) {
  let data = {}
  let computed = {}
  // + init_requests start +
  data.init_requests = {}
  init_requests.forEach(name => {
    data.init_requests[name] = {
      // 请求名称(接口名称)
      name,
      // 请求次数
      count: 0
    }
    // 计算属性
    computed[name + 'is_first'] = vm => {
      return vm.init_requests[name].count > 0
    }
  })
  // + init_requests end +
  let opt = {
    data () {
      return Object.assgin({
        $page_info: {}
      }, data)
    },
    computed: Object.assgin({
      inited () {
        var counts = Object.keys(this.init_requests)
          .map(name => {
            return this.init_requests[name].count > 0
          })
        // 所有初始化请求的请求次数全部大于0, 认为页面初始化完成
        return isAllTrue(counts)
      }
    }, computed)
  }
  return opt
}
