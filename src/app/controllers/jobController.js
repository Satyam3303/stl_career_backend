const {
  createJob,
  getAllJobs,
  findJobByJobCode,
} = require("../models/JobMaster");
const messages = require("../utils/messages.json");
const statusCode = require("../utils/httpStatusCodes.json");

const validate = require("../utils/validationKeyValue");

// Create a Job
const createJobHandler = async (req, res) => {
  try {
    let params = req.body;
    let requiredFields = [
      "job_title",
      "description",
      "job_category",
      "from_value_payScale",
      "to_value_payScale",
      "start_date",
      "expiry_date",
      "experience",
    ];
    const validateRes = validate.keyAndValueValidate(requiredFields, params);

    if (validateRes) {
      const pay_scale = JSON.stringify({
        min: params.from_value_payScale,
        max: params.to_value_payScale,
        unit: "LPA",
      });

      const generateJobCode = () => parseInt(Math.random() * 100000);

      //Logic to continuously make job code and check it so that it does not matches to other job code
      //and stays unique
      let job_code;
      let checkCode;

      do {
        job_code = generateJobCode();
        checkCode = await findJobByJobCode(job_code);
      } while (checkCode);

      const newJob = await createJob({
        job_code,
        job_title: params.job_title,
        description: params.description,
        job_category: params.job_category,
        pay_scale,
        start_date: params.start_date,
        expiry_date: params.expiry_date,
        experience: params.experience,
        status: 0,
        created_by: "Admin",
        created_on: new Date(),
        updated_by: "Admin",
        updated_at: new Date(),
      });

      return res.status(statusCode["2xx"].Created).send({
        status_code: statusCode["2xx"].Created,
        success: true,
        message: messages.en.Jobs.success.Created,
        response: { newJob },
      });
    } else {
      return res.status(statusCode["4xx"].Bad_Request).send({
        status_code: statusCode["4xx"].Bad_Request,
        success: false,
        message: messages.en.Users.error.empty_fields,
        response: {},
      });
    }
  } catch (error) {
    return res.status(statusCode["5xx"].Internal_Server_Error).send({
      status_code: statusCode["5xx"].Internal_Server_Error,
      success: false,
      message: messages.en.Jobs.error.internal_server_error,
      response: { error },
    });
  }
};

// Get Job By Job Code
const getJobByJobCode = async (req, res) => {
  try {
    const { job_code } = req.params;
    const Job = await findJobByJobCode(job_code);
    if (!Job) {
      return res.status(statusCode["4xx"].Not_Found).send({
        status_code: statusCode["4xx"].Not_Found,
        success: false,
        message: messages.en.Jobs.error.No_Job_Found,
        response: {},
      });
    }

    return res.status(statusCode["2xx"].OK).send({
      status_code: statusCode["2xx"].OK,
      success: true,
      message: messages.en.Jobs.success.Single_Job,
      response: { Job },
    });
  } catch (error) {
    return res.status(statusCode["5xx"].Internal_Server_Error).send({
      status_code: statusCode["5xx"].Internal_Server_Error,
      success: false,
      message: messages.en.Users.error.internal_server_error,
      error,
    });
  }
};

// Get all Jobs
const getAllJobsHandler = async (req, res) => {
  try {
    const jobs = await getAllJobs();
    return res.status(statusCode["2xx"].OK).send({
      status_code: statusCode["2xx"].OK,
      success: true,
      message: messages.en.Jobs.success.All_Jobs_Fetch,
      jobs,
    });
  } catch (error) {
    return res.status(statusCode["5xx"].Internal_Server_Error).send({
      status_code: statusCode["5xx"].Internal_Server_Error,
      success: false,
      message: messages.en.Users.error.internal_server_error,
      error,
    });
  }
};

module.exports = {
  createJobHandler,
  getJobByJobCode,
  getAllJobsHandler,
};
