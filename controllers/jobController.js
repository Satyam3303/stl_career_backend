const { getAllJobs } = require("../models/Job");
    
// const { generateToken } = require("../utils/JWT");
// const { Op } = require("sequelize");
// const sendMail = require('../utils/sendMail');
// const sendSms = require('../utils/sendSms');
// const otpStore = {};
const messages = require('../utils/messages.json');


// Get all Jobs
exports.registerJob = async (req, res) => {
  try {
  const jobs = await getAllJobs();
  return res.status(200).send({
    status_code: 200,
    success: true,
    message: messages.en.Jobs.success.All_Jobs_Fetch,
    jobs,
  });
  } catch (error) {
  return res.status(500).send({
    status_code: 500,
    success: false,
    message: messages.en.Users.error.internal_server_error,
    error,
  });
  }
  };
  


// Get all Jobs
exports.getAllJobs = async (req, res) => {
try {
const jobs = await getAllJobs();
return res.status(200).send({
  status_code: 200,
  success: true,
  message: messages.en.Jobs.success.All_Jobs_Fetch,
  jobs,
});
} catch (error) {
return res.status(500).send({
  status_code: 500,
  success: false,
  message: messages.en.Users.error.internal_server_error,
  error,
});
}
};
