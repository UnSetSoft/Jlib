class Remote {
      constructor(url) {
            this.url = url
      }

      async get(options = {}) {
            return await fetch(this.url, {
                  method: "GET",
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

module.exports = {
      Remote
}