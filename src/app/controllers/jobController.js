const {
  createJob,
  getAllJobs,
  findJobByJobCode,
} = require("../models/JobMaster");
const { expiry_date, experience } = require("../Schema/jobMasterSchema");

// const { generateToken } = require("../utils/JWT");
// const { Op } = require("sequelize");
// const sendMail = require('../utils/sendMail');
// const sendSms = require('../utils/sendSms');
const messages = require("../utils/messages.json");

// Register an Applicant
exports.registerJob = async (req, res) => {
  try {
    const {
      job_title,
      description,
      job_category,
      from_value_payScale,
      to_value_payScale,
      start_date,
      expiry_date,
      experience,
      status,
    } = req.body;

    if (!job_title || !description || !job_category || !from_value_payScale || !to_value_payScale || !start_date || !expiry_date || !experience || !status) {
      return res.status(400).send({
        status_code: 400,
        success: false,
        message: messages.en.Users.error.empty_fields,
        response: {},
      });
    }

    let job_code;
    let checkCode;

    const pay_scale = JSON.stringify({
      min: from_value_payScale,
      max: to_value_payScale,
      unit: 'LPA',
    });

    const generatejobCode = () => {
      return parseInt(Math.random()*100000);
    };

    do {
      job_code = generatejobCode();
      console.log(job_code)
      checkCode = await findJobByJobCode(job_code);
    } while (checkCode);

    const newJob = await createJob({
      job_code: job_code,
      job_title,
      description,
      job_category,
      pay_scale: pay_scale,
      start_date,
      expiry_date,
      experience,
      status,
      created_by: "Admin",
      created_on: new Date(),
      updated_by: "Admin",
      updated_at: new Date(),
    });

    return res.status(201).send({
      status_code: 201,
      success: true,
      message: messages.en.Jobs.success.Created,
      response: {
        newJob: newJob,
      },
    });
  } catch (error) {
    return res.status(500).send({
      status_code: 500,
      success: false,
      message: messages.en.Jobs.error.internal_server_error,
      response: {
        error: error || error,
      },
    });
  }
};

// Get Job By Job Code
exports.getJobByJobCode = async (req, res) => {
  try {
    const { job_code } = req.params;
    const Job = await findJobByJobCode(job_code);
    if (!Job) {
      return res.status(404).send({
        status_code: 404,
        success: false,
        message: messages.en.Jobs.error.No_Job_Found,
        response: {},
      });
    }

    return res.status(200).send({
      status_code: 200,
      success: true,
      message: messages.en.Jobs.success.Single_Job,
      response: {
        Job,
      },
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
