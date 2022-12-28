
export function initLifeCycle(Vue) {
  Vue.prototype._update = function() {
    'update'
  }
  Vue.prototype._render = function() {
    'render'
  }
}

export function mountComponent(vm, el) {
  vm._update(vm._render)
}