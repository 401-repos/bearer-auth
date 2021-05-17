'use strict';
require('dotenv').config();
const server = require('./src/server.js')
// Start up DB Server
const mongoose = require('mongoose');
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};
mongoose.connect(process.env.MONGODB_URI, options).then(() => {
  // Start the web server
  console.log('Connected to database');
  server.startup(process.env.PORT);
}).catch(err => console.log(err.message, "could not connect to data base"));