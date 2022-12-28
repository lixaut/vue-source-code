
let id = 0
class Dep {
  constructor() {
    this.id = id++
    // 当前属性存在的所有 Watcher
    this.subs = []
  }
  depend() {
    // this.subs.push(Dep.target)
    Dep.target.addDep(this)
  }
  addSub(watcher) {
    this.subs.push(watcher)
  }
  notify() {
    this.subs.foeEach(watcher => watcher.update())
  }
}
Dep.target = null
export default Dep