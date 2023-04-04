(function (global, factory) {
      typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
      typeof define === 'function' && define.amd ? define(factory) :
      (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global._k = factory());
})(this, (function () { 'use strict';

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

      class Kquery {
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
                  document.addEventListener('DOMContentLoaded', fn);
                  return this
            }

            /**
             * It returns a NodeList of all the elements that match the selector.
             * @returns The elements that are being returned are the elements that are being selected by the
             * querySelectorAll method.
             */
            getElements() {
                  const el = document.querySelectorAll(this.elements);
                  return el
            }

            /**
             * The function getElement() is a method of the class ElementHandler. It returns the element that
             * is selected by the querySelector() method
             * @returns The element that is being selected.
             */
            getElement() {
                  const el = document.querySelector(this.elements);
                  return el
            }


            /**
             * The event function takes two arguments, the first being the event type and the second being
             * the callback function. The event function then returns the event listener.
             * @param event - The event you want to listen for.
             * @param callback - The function to be called when the event is triggered.
             * @returns The event listener.
             */
            event(event, callback) {
                  this.getElements().forEach(el => el.addEventListener(event, callback));
                  return this
            }
            
            /**
             * It returns a new Remote object.
             * @param url - The URL of the API.
             * @returns A new instance of the Remote class.
             */
            remote(url) {
                  return new Remote(url)
            }

            /**
             * The function takes a string of HTML as an argument, and inserts it into the innerHTML of each
             * element in the collection.
             * @param html - The HTML to insert.
             * @returns the value of the variable ins.
             */
            insertHTML(html) {
                  this.getElements().forEach(el => el.innerHTML += html);
                  return this
            }

            /**
             * The function takes a boolean as an argument and returns a boolean.
             * @param boolean - true or false
             * @returns The return value is the result of the forEach method.
             */
            disableElement(boolean) {
                  this.getElements().forEach(el => el.disabled = boolean );
                  return this
            }

            /**
             * It adds a class to the element.
             * @param className - The class name to add to the element.
             */
            addClass(className) {
                  this.getElement().classList.add(className);
                  return this
                  
            }

            /**
             * The function removes a class from the element.
             * @param className - The class name to be removed from the element.
             */
            removeClass(className) {
                  this.getElement().classList.remove(className);
                  return this
            }

            /**
             * This function replaces the class name of the element with the new class name
             * @param className - The class name to be replaced.
             * @param newClassName - The new class name to replace the old one with.
             */
            replaceClass(className, newClassName) {
                  this.getElement().classList.replace(className, newClassName);
                  return this
            }

            /**
             * This function returns the dataset of the element.
             * @returns The dataset property of the element.
             */
            getDataSet() {
                  return this.getElement().dataset
            }

            /**
             * For each element in the array of elements, return the dataset of that element.
             * @returns An array of objects.
             * @buged Return undefined
             */
            getDataSets() {
                  return this.getElements().forEach(el => el.dataset )
            }

            /**
             * It removes all the children of the element.
             * @returns null.
             */
            removeChildrens() {
                  this.getElement().innerHTML = "";
                  return this
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

                  return this
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
                  const isString = typeof property === 'string';
                  const isObject = typeof property === 'object';
               
                  if (isString) { 
                        this.getElement().style[property] = value;
                  } else if (isObject) {
                        const enCss = Object.entries(property);
                        enCss.forEach(([property, value]) => { 
                              this.getElement().style[property] = value;
                        });
                  }
                  

                  return this
            }

            /**
             * The function returns a new instance of the Animation class, which takes the element as a
             * parameter.
             * @returns The Animation class is being returned.
             */
            animate() {
                  return new Animate(this.getElement())
            }

            /**
             * The append function takes a child element and appends it to the current element. 
       
             * @param child - The child element to append to the parent element.
             * @returns self.
             */
            append(child) {
                  this.getElement().append(child);
                  return this
            }

            /**
             * The remove() function removes the element from the DOM.
             * @returns self.
             */
            remove() { 
                  this.getElement().remove();
                  return this
            }

      }

      const _k = (el) => new Kquery(el);

      window._k = _k;

      return _k;

}));
