const express = require("express");
const router = express.Router();
const {
  getAllJobsHandler,
  getJobByJobCode,
  createJobHandler
} = require("../controllers/jobController");

// Authentication using JWT(Currently not implemented because of missing admin/user logic)
const authMiddleware = require('../middleware/authMiddleware');

router.post("/job", createJobHandler);
router.get("/job", getAllJobsHandler);
router.get("/job/:job_code", getJobByJobCode);

module.exports = router;