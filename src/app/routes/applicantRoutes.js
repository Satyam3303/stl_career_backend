const express = require("express");
const router = express.Router();
const {
  registerApplicant,
  getApplicantByApplicantCode,
  loginApplicant,
  applyApplicant
} = require("../controllers/applicantController");

const upload = require('../middleware/upload'); 

// Authentication using JWT
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", registerApplicant);
router.post("/login", loginApplicant);
router.get("/:applicant_code", authMiddleware, getApplicantByApplicantCode);
router.put("/apply/:applicant_code", authMiddleware, upload.single('resume_path'), applyApplicant);


// router.delete("/:applicantCode",authMiddleware, deleteUser);
//router.put("/update/:applicantCode", authMiddleware, updateApplicant);
// router.get("/users/all-applicants",authMiddleware, getAllUsers);


module.exports = router;
