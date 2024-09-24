const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const JobMasterSchema = require('../Schema/jobMasterSchema.js');

const JobMaster = sequelize.define('JobMaster', JobMasterSchema, {
  tableName: 'job_master',
  timestamps: false,
});


async function createJob(data) {
  return await JobMaster.create(data);
}

async function findJobByJobId(job_code) {
  return await JobMaster.findOne({ where: { job_code } });
}

async function findApplicantByEmail(email) {
  return await JobMaster.findOne({ where: { email } });
}

async function findApplicantByPhone(phone) {
  return await JobMaster.findOne({ where: { phone } });
}

async function findApplicantByUserName(username) {
  return await JobMaster.findOne({ where: { username } });
}

module.exports = {
  createJob,
  findJobByJobId,
  getAllJobs,
};
