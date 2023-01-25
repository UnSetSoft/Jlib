const {Kquery} = require("./models/query.mjs")

const $ = (el) => new Kquery(el)

module.exports = {$}