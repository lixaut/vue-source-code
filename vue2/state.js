import { observe } from "./observe"

export function initState(vm) {
  const opts = vm.$options
  if (opts.data) {
    // 初始化数据
    initData(vm)
  }
}

function initData(vm) {
  // 可能是函数和对象
  let data = vm.$options.data
  data = typeof data === 'function' ? data.call(vm) : data
  // 数据挂载到实例对象上
  vm._data = data
  // 数据劫持
  observe(data)
  // 代理数据到vm上
  for (let key in data) {
    proxy(vm, '_data', key)
  }
}

function proxy(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[target][key]
    },
    set(newValue) {
      vm[target][key] = newValue
    }
  })
}