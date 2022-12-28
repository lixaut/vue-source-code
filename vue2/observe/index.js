import { newArrayProto } from "./array"
import Dep from './dep'

class Observer {
  constructor(data) {
    // 防止陷入循环
    Object.defineProperty(data, '__ob__', {
      value: this,
      enumerable: false
    })
    data.__ob__ = this
    // 劫持数组性能差
    if (Array.isArray(data)) {
      data.__proto__ = newArrayProto
      this.observeArray(data)
    } else {
      this.walk(data)
    }
  }
  observeArray(data) {
    data.forEach(item => observe(item))
  }
  walk(data) {
    // 重新定义属性
    Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
  }
}

export function defineReactive(target, key, value) {
  // 递归劫持数据
  observe(value)
  let dep = new Dep()
  Object.defineProperty(target, key, {
    // 取值时执行
    get() {
      if (Dep.target) {
        dep.depend()
      }
      return value
    },
    // 修改时执行
    set(newValue) {
      if (newValue === value) return
      observe(newValue)
      value = newValue
      dep.notify()
    }
  })
}

export function observe(data) {
  // 对象劫持
  if (typeof data !== 'object' || data == null) {
    return
  }
  // 已被劫持过
  if (data.__ob__ instanceof Observer) {
    return data.__ob__
  }
  // 如果被劫持过，就不需要再劫持（用实例来判断是否被劫持过）
  return new Observer(data)
}