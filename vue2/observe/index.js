
class Observer {
  constructor(data) {
    this.walk(data)
  }
  walk(data) {
    // 重新定义属性
    Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
  }
}

export function defineReactive(target, key, value) {
  // 递归劫持数据
  observe(value)
  Object.defineProperty(target, key, {
    // 取值时执行
    get() {
      return value
    },
    // 修改时执行
    set(newValue) {
      if (newValue === value) return
      value = newValue
    }
  })
}

export function observe(data) {
  // 对象劫持
  if (typeof data !== 'object' || data == null) {
    return
  }
  // 如果被劫持过，就不需要再劫持（用实例来判断是否被劫持过）
  return new Observer(data)
}