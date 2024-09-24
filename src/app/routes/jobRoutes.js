const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  getJobByJobId,
  registerJob
} = require("../controllers/jobController");

// Authentication using JWT
const authMiddleware = require('../middleware/authMiddleware');

router.post("/job/:job_id", registerJob);
router.get("/job/", getAllJobs);
router.get("/job/:job_id", getJobByJobId);

module.exports = router;