const { createJob, getAllJobs, findJobByJobCode } = require("../models/JobMaster");
const { expiry_date } = require("../Schema/jobMasterSchema");

// const { generateToken } = require("../utils/JWT");
// const { Op } = require("sequelize");
// const sendMail = require('../utils/sendMail');
// const sendSms = require('../utils/sendSms');
const messages = require("../utils/messages.json");

// Register an Applicant
exports.registerJob = async (req, res) => {
  try {
    const { username, phone, email, password } = req.body;

    if (!username || !phone || !email || !password) {
      return res.status(400).send({
        status_code: 400,
        success: false,
        message: messages.en.Users.error.empty_fields,
        response: {},
      });
    }

    let job_code;
    let checkCode;

    const generatejobCode = () => {
      return Math.random().toString(36).substring(2, 10).toUpperCase();
    };

    do {
      job_code = generatejobCode();
      checkCode = await findJobByJobCode(job_code);
    } while (checkCode);

    const newJob = await createJob({
      job_code:job_code,
      job_title,
      description,
      job_category,
      pay_scale,
      start_date,
      expiry_date,
      status,
      created_by: "Admin",
      created_at: new Date(),
      updated_by: "Admin",
      updated_at: new Date(),
    });

    return res.status(201).send({
      status_code: 201,
      success: true,
      message: messages.en.Users.success.User_Create,
      response: {
        newJob: newJob,
      },
    });
  } catch (error) {
    return res.status(500).send({
      status_code: 500,
      success: false,
      message: messages.en.Users.error.internal_server_error,
      response:{
        error: error.message || error,
      }
    });
  }
};

// Get Job By Job Id
exports.getJobByJobId = async (req, res) => {
  try {
    const { job_code } = req.params;
    const Job = await findJobByJobCode(job_code);

    if (!Job) {
      return res.status(404).send({
        status_code: 404,
        success: false,
        message: messages.en.Users.error.No_Job_Found,
        response: {},
      });
    }

    return res.status(200).send({
      status_code: 200,
      success: true,
      message: messages.en.Jobs.success.Single_Job,
      response: {
        applicant,
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
