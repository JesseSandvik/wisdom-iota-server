const User = require('../user/user.model');
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
  const {password, user} = req.body;

  if (!password || !user) {
    return res.status(400).json({message: 'Username and password are required.'});
  }
};

module.exports = {handleLogin};
