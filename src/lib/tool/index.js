import Remote from "../remote/index.js";
import Animate from "../animate/index.js";
import Random from "../Random/index.js";
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

export default Jlib;
