const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/lib", express.static(__dirname + "/lib"));
 


app.use(cors("*"));


app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`)
});