import Kquery from './kquery/index.js'
const _k = (el) => new Kquery(el)

window._k = _k;

export default _k