
import Dep from './dep'

let id = 0
class Watcher {
  constructor(vm, fn, options) {
    this.id = id++
    this.renderWatcher = options
    this.getter = fn
    this.deps = []
    this.depsId = new Set()
    this.get()
  }
  get() {
    Dep.target = this
    this.getter()
    Dep.target = null
  }
  addDep(dep) {
    let id = dep.id
    if (!this.depsId.has(id)) {
      this.deps.push(dep)
      this.depsId.add(id)
      dep.addSub(this)
    }
  }
  update() {
    // this.get()
    queueWatcher(this)
  }
  run() {
    this.get()
  }
}

let queue = []
let has = {}
let pending = false

function flushSchedulerQueue() {
  let flushQueue = queue.slice(0)
  queue = []
  has = {}
  flushQueue.forEach(q => q.run())
}

function queueWatcher(watcher) {
  const id = watcher.id
  if (!has[id]) {
    queue.push(watcher)
    has[id] = true
    if (!pending) {
      nextTick(flushSchedulerQueue, 0)
      pending = true
    }
  }
}

let callbacks = []
let waiting = false

function flushCallbacks() {
  let cbs = callbacks.slice(0)
  waiting = false
  callbacks = []
  cbs.forEach(cb => cb())
}

let timerFunc
if (Promise) {
  timerFunc = () => {
    Promise.resolve().then(flushCallbacks)
  }
} else if (MutationObserver) {

} else {
  setTimeout(flushCallbacks, 0)
}

export function nextTick(cb) {
  callbacks.push(cb)
  if (!waiting) {
    timerFunc()
    waiting = true
  }
}

export default Watcher