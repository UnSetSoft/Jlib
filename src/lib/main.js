import Jlib from "./tool/index.js";
const jlib = (el) => new Jlib(el);
window.Jlib = jlib;

export default jlib;
export { jlib };
