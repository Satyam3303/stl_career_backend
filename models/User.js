const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const UserSchema = require('../Schema/userSchema');

const User = sequelize.define('User', UserSchema, {
  tableName: 'user_table',
  timestamps: false,
});


async function createUser(data) {
  return await User.create(data);
}

async function findUserByUserCode(user_code) {
  return await User.findOne({ where: { user_code } });
}

async function findUserByEmail(email) {
  return await User.findOne({ where: { email } });
}

async function findUserByPhone(phone) {
  return await User.findOne({ where: { phone } });
}

// async function findUserByUsername(user_name) {
//   return await User.findOne({ where: { user_name } });
// }

// async function deleteUserByUsername(user_name) {
//   return await User.destroy({ where: { user_name } });
// }

// async function getAllUsers() {
//   return await User.findAll({
//     limit: 10, 
//   });
// }

module.exports = {
  createUser,
  findUserByUserCode,
  findUserByEmail,
  findUserByPhone,
};