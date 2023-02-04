class Remote {
      /**
       * The constructor function is a special function that is called when a new instance of the class
       * is created.
       * @param url - The URL of the API endpoint.
       */
      constructor(url) {
            this.url = url
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
       * It sends a POST request to the url, and returns the response in JSON format
       * @param [options] - The options object is the same as the fetch api, you can pass headers,
       * body, etc.
       * @returns The data from the api.
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

export default Remote