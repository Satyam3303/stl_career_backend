const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  getJobByJobCode,
  registerJob
} = require("../controllers/jobController");

// Authentication using JWT
const authMiddleware = require('../middleware/authMiddleware');

router.post("/job", registerJob);
router.get("/job", getAllJobs);
router.get("/job/:job_code", getJobByJobCode);

module.exports = router;