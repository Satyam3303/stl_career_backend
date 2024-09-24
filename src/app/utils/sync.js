const sequelize = require('../Database/database');


//Forces the table to synchronize with the database
sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
  });