const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const AuthenticationSchema = require('../src/app/Schema/authenticationSchema');

const Authentication = sequelize.define('Authentication', AuthenticationSchema, {
  tableName: 'authentication_table',
  timestamps: false,
});

async function createAuthentication(data) {
  return await Authentication.create(data);
}

async function findAuthenticationByUserCode(user_code) {
  return await Authentication.findOne({ where: { user_code } });
}

// async function findUserByPhone(phone) {
//   return await User.findOne({ where: { phone } });
// }

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
  createAuthentication,
  findAuthenticationByUserCode,
};
