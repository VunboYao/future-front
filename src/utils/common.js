/**
 * localStorage 别名方法
 * @type {{set(*, *): void, get(*): any}}
 */
export const local = {
  get(key) {
    return JSON.parse(localStorage.getItem(key))
  },
  set(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  },
}
