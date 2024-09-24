const { Sequelize } = require('sequelize');

//Database Details
const sequelize = new Sequelize('cms_v1', 'remotemysql', 'pAssword@123', {
  host: '192.168.0.113',
  dialect: 'mysql',
});

//Used for Authentiction

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;