const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const ApplicantSchema = require('../src/app/Schema/applicantSchema.js');

const Applicant = sequelize.define('Applicant', ApplicantSchema, {
  tableName: 'applicant_table',
  timestamps: false,
});


async function createApplicant(data) {
  return await Applicant.create(data);
}

async function findApplicantByApplicantCode(applicant_code) {
  return await Applicant.findOne({ where: { applicant_code } });
}

async function findApplicantByEmail(email) {
  return await Applicant.findOne({ where: { email } });
}

async function findApplicantByPhone(phone) {
  return await Applicant.findOne({ where: { phone } });
}

async function findApplicantByUserName(username) {
  return await Applicant.findOne({ where: { username } });
}



async function updateApplicant(applicant_code, data) {
  return await Applicant.update(data, {
    where: { applicant_code },
  });
}

// async function deleteUserByUsername(user_name) {
//   return await Applicant.destroy({ where: { user_name } });
// }

// async function getAllUsers() {
//   return await Applicant.findAll({
//     limit: 10, 
//   });
// }

module.exports = {
    createApplicant,
    findApplicantByApplicantCode,
    findApplicantByPhone,
    findApplicantByEmail,
    updateApplicant,
    findApplicantByUserName
};
