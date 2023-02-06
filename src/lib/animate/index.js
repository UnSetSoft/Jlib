class Animate {
      constructor(element) {

            this.element = element
            this.options = {
                  duration: 400,
                  iterations: 1
            }

      }

      /**
       * The function takes an object as an argument and assigns it to the variable options. The
       * function then uses the variable options to animate the element
       * @param opt - The options object that is passed to the animate method.
       * @returns The object itself.
       */
      fadeIn(opt) {
            const options = opt || this.options
            this.element.animate([
                  { opacity: 0 },
                  { opacity: 1 }
            ], options)
            return this
      }

      /**
       * The function takes an object as an argument and assigns it to the variable options. The
       * function then uses the variable options to animate the element
       * @param opt - The options object that is passed to the animate method.
       * @returns The object that is being returned is the object that is being created.
       */
      fadeOut(opt) {
            const options = opt || this.options
            this.element.animate([
                  { opacity: 1 },
                  { opacity: 0 }
            ], options)
            return this
      }

      /**
       * The animate function takes two arguments, keyframes and opt, and returns the element with the
       * animation applied.
       * @param keyframes - An array of objects containing CSS properties and values.
       * @param opt - The options object for the animation.
       * @returns The object itself.
       */
      anime(keyframes, opt) {
            const options = opt || this.options
            this.element.animate(keyframes, options)
            return this
      }
}

export default Animate