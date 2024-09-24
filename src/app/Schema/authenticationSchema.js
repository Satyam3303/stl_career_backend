const { DataTypes } = require('sequelize');

const AuthenticationSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_code: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role_code: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  token: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  created_by: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_by: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
  record_status: {
    type: DataTypes.TINYINT,
    defaultValue: 1,
  },
};

module.exports = AuthenticationSchema;
