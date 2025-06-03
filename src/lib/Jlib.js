(function (global, factory) {
      typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
      typeof define === 'function' && define.amd ? define(['exports'], factory) :
      (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Jlib = {}));
})(this, (function (exports) { 'use strict';

      class Remote {
            /**
             * The constructor function is a special function that is called when a new instance of the class
             * is created.
             * @param url - The URL of the API endpoint.
             */
            constructor(url) {
                  this.url = url;
            }

            /**
             * It fetches the url, then returns the json data
             * @param [options] - The options of the request, such as headers, body, etc.
             * @returns The data from the api.
             */
            async get(options = {}) {
                  return await fetch(this.url, {
                        method: "GET",
                        ...options
                  }).then(async (r) => {
                        if (!r) {
                            throw new Error("An error occurred in the api, check the log of the response.")  
                        }

                        return r.json()
                  }).then((data) => data).catch((err) => {
                        return err.message
                  })
            }

            /**
             * It sends a POST request to the url, and returns the response in JSON format
             * @param [options] - The options object is the same as the fetch api, you can pass headers,
             * body, etc.
             * @returns The response of the fetch request.
             */
            async post(options = {}) {
                  return await fetch(this.url, {
                        method: "POST",
                        ...options
                  }).then((r) => {
                        if (!r) {
                            throw new Error("An error occurred in the api, check the log of the response.")  
                        }

                        return r.json()
                  }).then((data) => data).catch((err) => {
                        return err.message
                  })
            }


            /**
             * It takes an options object and returns a promise that resolves to a json object
             * @param [options] - {
             * @returns The response of the fetch request.
             */
            async put(options = {}) {
                  return await fetch(this.url, {
                        method: "PUT",
                        ...options
                  }).then((r) => {
                        if (!r) {
                            throw new Error("An error occurred in the api, check the log of the response.")  
                        }

                        return r.json()
                  }).then((data) => data).catch((err) => {
                        return err.message
                  })
            }

            /**
             * It sends a DELETE request to the url and returns the response in JSON format
             * @param [options] - An object that contains the following:
             * @returns The response from the server.
             */
            async delete(options = {}) {
                  return await fetch(this.url, {
                        method: "DELETE",
                        ...options
                  }).then((r) => {
                        if (!r) {
                            throw new Error("An error occurred in the api, check the log of the response.")  
                        }

                        return r.json()
                  }).then((data) => data).catch((err) => {
                        return err.message
                  })
            }
      }

      class Animate {
            constructor(element) {

                  this.element = element;
                  this.options = {
                        duration: 400,
                        iterations: 1
                  };

            }

            /**
             * The function takes an object as an argument and assigns it to the variable options. The
             * function then uses the variable options to animate the element
             * @param opt - The options object that is passed to the animate method.
             * @returns The object itself.
             */
            fadeIn(opt) {
                  const options = opt || this.options;
                  this.element.animate([
                        { opacity: 0 },
                        { opacity: 1 }
                  ], options);
                  return this
            }

            /**
             * The function takes an object as an argument and assigns it to the variable options. The
             * function then uses the variable options to animate the element
             * @param opt - The options object that is passed to the animate method.
             * @returns The object that is being returned is the object that is being created.
             */
            fadeOut(opt) {
                  const options = opt || this.options;
                  this.element.animate([
                        { opacity: 1 },
                        { opacity: 0 }
                  ], options);
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
                  const options = opt || this.options;
                  this.element.animate(keyframes, options);
                  return this
            }
      }

      class Random {
        constructor(seed = Date.now()) {
          this.backend = null;

          if (typeof globalThis.crypto?.getRandomValues === "function") {
            this.backend = "browser";
          } else if (typeof require !== "undefined") {
            try {
              this.nodeCrypto = require("crypto");
              if (typeof this.nodeCrypto.randomBytes === "function") {
                this.backend = "node";
              }
            } catch {
              this.backend = null;
            }
          }

          if (!this.backend) {
            this.backend = "lcg";
            this._lcgSeed = seed >>> 0;
          }
        }

        _u32() {
          if (this.backend === "browser") {
            const arr = new Uint32Array(1);
            crypto.getRandomValues(arr);
            return arr[0];
          } else if (this.backend === "node") {
            return this.nodeCrypto.randomBytes(4).readUInt32LE();
          } else {
            // LCG fallback
            this._lcgSeed = (1664525 * this._lcgSeed + 1013904223) >>> 0;
            return this._lcgSeed;
          }
        }

        random() {
          return this._u32() / 0xffffffff;
        }

        int(min, max, step = 1) {
          const range = Math.floor((max - min) / step) + 1;
          return min + step * (this._u32() % range);
        }

        boolean(prob = 0.5) {
          return this.random() < prob;
        }

        shuffle(array) {
          for (let i = array.length - 1; i > 0; i--) {
            const j = this._u32() % (i + 1);
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        }

        toShuffled(array) {
          return this.shuffle([...array]);
        }

        take(array, n) {
          return this.toShuffled(array).slice(0, n);
        }

        sample(array, options = {}) {
          const { weights } = options;
          if (!weights) {
            return array[this._u32() % array.length];
          }

          const total = weights.reduce((a, b) => a + b, 0);
          let threshold = this.random() * total;

          for (let i = 0; i < array.length; i++) {
            if (threshold < weights[i]) return array[i];
            threshold -= weights[i];
          }
        }

        bytes(n) {
          const buf = new Uint8Array(n);
          this.fillBytes(buf);
          return buf;
        }

        fillBytes(buf) {
          if (this.backend === "browser") {
            crypto.getRandomValues(buf);
          } else if (this.backend === "node") {
            const bytes = this.nodeCrypto.randomBytes(buf.length);
            for (let i = 0; i < buf.length; i++) buf[i] = bytes[i];
          } else {
            // LCG fallback
            for (let i = 0; i < buf.length; i++) {
              buf[i] = this._u32() & 0xff;
            }
          }
        }

        getBackend() {
          return this.backend;
        }
      }

      class Jlib {
        /**
         * The constructor function takes in an element and assigns it to the elements property of the
         * object.
         * @param elements - The elements to be added to the array.
         */
        constructor(elements) {
          this.elements = [elements];
        }

        /**
         * If the DOM is ready, run the function, otherwise wait until it is ready and then run the
         * function.
         * @param fn - The function to be executed when the DOM is ready.
         * @returns The function fn is being returned.
         */
        load(fn) {
          document.addEventListener("DOMContentLoaded", fn);
          return this;
        }

        /**
         * It returns a NodeList of all the elements that match the selector.
         * @returns The elements that are being returned are the elements that are being selected by the
         * querySelectorAll method.
         */
        getElements() {
          const el = document.querySelectorAll(this.elements);
          return el;
        }

        /**
         * The function getElement() is a method of the class ElementHandler. It returns the element that
         * is selected by the querySelector() method
         * @returns The element that is being selected.
         */
        getElement() {
          const el = document.querySelector(this.elements);
          return el;
        }

        /**
         * The event function takes two arguments, the first being the event type and the second being
         * the callback function. The event function then returns the event listener.
         * @param event - The event you want to listen for.
         * @param callback - The function to be called when the event is triggered.
         * @returns The event listener.
         */
        event(event, callback) {
          this.getElements().forEach((el) => el.addEventListener(event, callback));
          return this;
        }

        /**
         * It returns a new Remote object.
         * @param url - The URL of the API.
         * @returns A new instance of the Remote class.
         */
        remote(url) {
          return new Remote(url);
        }

        /**
         * The function takes a string of HTML as an argument, and inserts it into the innerHTML of each
         * element in the collection.
         * @param html - The HTML to insert.
         * @returns the value of the variable ins.
         */
        insertsHTML(html) {
          this.getElements().forEach((el) => (el.innerHTML += html));
          return this;
        }

        /**
         * The function appends text to the inner text of all elements returned by a selector.
         * @param txt - txt is a parameter that represents the text that will be inserted into the innerText
         * property of the selected elements.
         * @returns the current object (`this`) to allow for method chaining.
         */
        insertsTXT(txt) {
          this.getElements().forEach((el) => (el.innerText += txt));
          return this;
        }

        /**
         * The function sets the inner text of an element and returns the element.
         * @param txt - The text that will be inserted into the element's inner text.
         * @returns the object that called it, which is likely an instance of a class or an object with a
         * similar structure.
         */
        insertTXT(txt) {
          this.getElement().innerText = txt;
          return this;
        }

        /**
         * The function inserts HTML code into an element's innerHTML property and returns the element.
         * @param html - The HTML code that will be inserted into the element's innerHTML property.
         * @returns The object that the `insertHTML` method belongs to is being returned.
         */
        insertHTML(html) {
          this.getElement().innerHTML = html;
          return this;
        }

        /**
         * The function takes a boolean as an argument and returns a boolean.
         * @param boolean - true or false
         * @returns The return value is the result of the forEach method.
         */
        disableElement(boolean) {
          this.getElements().forEach((el) => (el.disabled = boolean));
          return this;
        }

        /**
         * It adds a class to the element.
         * @param className - The class name to add to the element.
         */
        addClass(className) {
          this.getElement().classList.add(className);
          return this;
        }

        /**
         * The function removes a class from the element.
         * @param className - The class name to be removed from the element.
         */
        removeClass(className) {
          this.getElement().classList.remove(className);
          return this;
        }

        /**
         * This function replaces the class name of the element with the new class name
         * @param className - The class name to be replaced.
         * @param newClassName - The new class name to replace the old one with.
         */
        replaceClass(className, newClassName) {
          this.getElement().classList.replace(className, newClassName);
          return this;
        }

        /**
         * This function returns the dataset of the element.
         * @returns The dataset property of the element.
         */
        getDataSet() {
          return this.getElement().dataset;
        }

        /**
         * For each element in the array of elements, return the dataset of that element.
         * @returns An array of objects.
         * @buged Return undefined
         */
        getDataSets() {
          return this.getElements().forEach((el) => el.dataset);
        }

        /**
         * It removes all the children of the element.
         * @returns null.
         */
        removeChildrens() {
          this.getElement().innerHTML = "";
          return this;
        }

        /**
         * This function returns true if the element has the class, and false if it doesn't.
         * @param className - The class name to check for.
         * @returns The return value is a boolean value.
         */
        hasClass(className) {
          return this.getElement().classList.contains(className);
        }

        /**
         * If the element has the class, remove it. If it doesn't have the class, add it.
         * @param className - The class name to toggle.
         * @returns The element itself.
         */
        toggleClass(className) {
          if (this.hasClass(className)) {
            this.removeClass(className);
          } else {
            this.addClass(className);
          }

          return this;
        }

        /**
         * If the first argument is a string, then set the style property of the element to the value of
         * the second argument. If the first argument is an object, then set the style property of the
         * element to the value of the object.
         * @param args - The arguments passed to the function.
         * @returns self.
         */
        style(...args) {
          const [property, value] = args;
          const isString = typeof property === "string";
          const isObject = typeof property === "object";

          if (isString) {
            this.getElement().style[property] = value;
          } else if (isObject) {
            const enCss = Object.entries(property);
            enCss.forEach(([property, value]) => {
              this.getElement().style[property] = value;
            });
          }

          return this;
        }

        /**
         * The function returns a new instance of the Animation class, which takes the element as a
         * parameter.
         * @returns The Animation class is being returned.
         */
        animate() {
          return new Animate(this.getElement());
        }

        /**
             * The append function takes a child element and appends it to the current element. 
       
             * @param child - The child element to append to the parent element.
             * @returns self.
             */
        append(child) {
          this.getElement().append(child);
          return this;
        }

        /**
         * The remove() function removes the element from the DOM.
         * @returns self.
         */
        remove() {
          this.getElement().remove();
          return this;
        }

        Aleatory(seed = Date.now()) {
          return new Random(seed);
        }
      }

      const jlib = (el) => new Jlib(el);
      window.Jlib = jlib;

      exports.default = jlib;
      exports.jlib = jlib;

      Object.defineProperty(exports, '__esModule', { value: true });

}));
