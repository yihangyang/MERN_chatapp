const { mongodb_name, mongodb_pass } = require("./config/private/access");
const { request, response } = require("express");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const { User } = require('./models/User');
const { mongoURI } = require("./config/key");
const { auth } = require("./middlewares/auth");

const app = express()

// mongo database
const connect = mongoose.connect(mongoURI ,{
  useNewUrlParser: true, // remove duplication errors from mongo
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected")
}).catch(err => {
  console.error(err)
})

// middleware cookieparse
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true })) // no duplication waning
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api/users', require('./routes/users'));

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder   
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});