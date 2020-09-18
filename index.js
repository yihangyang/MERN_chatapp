const { request } = require("express");

const express = require("express");
const mongoose = require("mongoose");
const { mongodb_name, mongodb_pass } = require("./private/access");
const app = express()

mongoose.connect(`mongodb+srv://${mongodb_name}:${mongodb_pass}@cluster0.utsnh.mongodb.net/<dbname>?retryWrites=true&w=majority`,{
  useNewUrlParser: true // remove duplication errors from mongo
}).then(() => {
  console.log("MongoDB connected")
}).catch(err => {
  console.error(err)
})

app.get('/', (req, res) => {
  res.send('hello world')
})
app.listen(5000)