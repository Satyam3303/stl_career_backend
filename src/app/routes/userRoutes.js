const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserByUserCode
} = require("../controllers/userController");

// Authentication using JWT
const authMiddleware = require('../middleware/authMiddleware');

router.post("/register", registerUser);
router.get("/:user_code",authMiddleware, getUserByUserCode);
// router.delete("/:email",authMiddleware, deleteUser);
// router.put("/update/:email",authMiddleware, updateUser);
router.post("/login", loginUser);
// router.get("/users/all-users",authMiddleware, getAllUsers);
// router.post("/verifyOtp", verifyOtp);

module.exports = router;