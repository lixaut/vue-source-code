
// 重写数组原型方法（7）
let oldArrayProto = Array.prototype
export let newArrayProto = Object.create(oldArrayProto)

let methods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'reverse',
  'sort',
  'splice'
]

methods.forEach(item => {
  newArrayProto[item] = function (...args) {
    const result = oldArrayProto[item].call(this, ...args)
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
      default: 
        break
    }
    if (inserted) {
      this.__ob__.observeArray(inserted)
    }
    return result
  }
})
console.log(newArrayProto)