const {Remote} = require("./remote.mjs")
class Kquery {
      constructor(elements) {
            this.elements = [elements]
      }

      load(fn) {
            document.addEventListener('DOMContentLoaded', fn)
            return
      }

      getElements() {
            const el = document.querySelectorAll(this.elements)
            return el
      }

      event(event, callback) {
            const ev = this.getElements().forEach(el => el.addEventListener(event, callback))
            return ev
      }
      
      remote(url) {
            return new Remote(url)
      }
}

module.exports = {Kquery}