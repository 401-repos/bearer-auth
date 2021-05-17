'use strict';

const base64 = require('base-64');
const User = require('../models/users.js');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    next('Please provide a username and password!!!')
  }
  let basic = req.headers.authorization;
  let auth = basic.split(' ').pop();
  let decoded = base64.decode(auth)
  let [username, password] = decoded.split(':');

  try {
    req.user = await User.authenticateBasic(username, password)
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }

}