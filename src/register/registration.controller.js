const usersDB = {
  users: require('../user/user.model.json'),
  setUsers: function(data) {
    this.users = data;
  },
};
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  const {password, user} = req.body;
  if (!password || !user) {
    return res.status(400).json({message: 'Username and password are required.'});
  }
  const duplicate = usersDB.users.find(user => user.username === user);

  if (duplicate) {
    res.sendStatus(409);
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {username: user, password: hashedPassword};
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(path.join(__dirname, '..', ''));
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

module.exports = {createUser};
