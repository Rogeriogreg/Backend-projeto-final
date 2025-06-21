const { User } = require("../models");

async function createUser(userData) {
  return await User.create(userData);
}

async function getUserByEmail(email) {
  return await User.findOne({ where: { email } });
}

module.exports = {
  createUser,
  getUserByEmail,
};
