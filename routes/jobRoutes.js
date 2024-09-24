const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  getJobByJobId,
  registerJob
} = require("../controllers/jobController");

// Authentication using JWT
const authMiddleware = require('../middleware/authMiddleware');

router.post("/job/:job_id", authMiddleware, registerJob);
router.get("/job/", authMiddleware, getAllJobs);
router.get("/job/:job_id", authMiddleware, getJobByJobId);

module.exports = router;