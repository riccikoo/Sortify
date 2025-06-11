const dbConfig = require('../config/db.config.js');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import model User
db.User = require('./user.model.js')(sequelize, DataTypes);

// Import model Schedule
db.Schedule = require('./schedule.model.js')(sequelize, DataTypes);

// Define associations (jika ada)
if (db.Schedule.associate) db.Schedule.associate(db);
if (db.User.associate) db.User.associate(db);

// Sinkronisasi semua model ke DB
db.sequelize.sync()
  .then(() => {
    console.log("Database tersinkronisasi.");
  })
  .catch((err) => {
    console.error("Gagal sinkronisasi DB:", err.message);
  });

module.exports = db;
