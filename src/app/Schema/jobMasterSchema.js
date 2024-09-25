const { DataTypes } = require('sequelize');

const JobMasterSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  job_code: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  job_title: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  job_category: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  pay_scale: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  expiry_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
  created_by: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  created_on: {
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
  experience: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
};

module.exports = JobMasterSchema;
