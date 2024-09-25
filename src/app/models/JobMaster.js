const { DataTypes } = require('sequelize');
const sequelize = require('../Database/database.js');
const JobMasterSchema = require('../Schema/jobMasterSchema.js');

const JobMaster = sequelize.define('JobMaster', JobMasterSchema, {
  tableName: 'job_master',
  timestamps: false,
});


async function createJob(data) {
  return await JobMaster.create(data);
}

async function findJobByJobCode(job_code) {
  return await JobMaster.findOne({ where: { job_code } });
}

async function getAllJobs() {
  return await JobMaster.findAll({
    limit: 10, 
  });
}


module.exports = {
  createJob,
  findJobByJobCode,
  getAllJobs,
};
