const { DataTypes } = require('sequelize');

const ApplicantSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  applicant_code: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  job_code: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  username: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  middle_name: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  last_name: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  phone: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  years_of_experience: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  father_name: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female', 'Other'),
    allowNull: true,
  },
  plot_no: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  locality: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  post: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  state_district: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  pin: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  qualification: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  skill_set: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  declaration: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  resume_path: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  created_by: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
  updated_by: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
};

module.exports = ApplicantSchema;
