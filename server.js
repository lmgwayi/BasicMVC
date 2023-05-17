// console.log ("Hello World")

const express = require("express");
require('dotenv').config()
const cors = require("cors");
const app = express();
const initRotes = require("./routes/user.routes")
const PORT = process.env.PORT;

const DB = require("./config/db.config")
const db = require('./models')

//     var corsOptions = {
//     origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true, limit: '50mb'}));

db.mongoose.connect(DB.db_url)
  .then(console.log("Connected successfully"))
  .catch(err=>{console.log("Error message : " + err)})

initRotes(app)

app.listen(process.env.PORT, () => {
    console.log(`Server is running @ port ${PORT}.`);
})