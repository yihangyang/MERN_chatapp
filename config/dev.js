const { mongodb_name, mongodb_pass, mongodb_database } = require("../private/access");


module.exports = {
  mongoURI: `mongodb+srv://${mongodb_name}:${mongodb_pass}@cluster0.utsnh.mongodb.net/${mongodb_database}?retryWrites=true&w=majority`
}