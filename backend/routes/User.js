const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  signupUser,
} = require("../controllers/User");

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

//login
router.post("/login", loginUser);
//signup
router.post("/signup",signupUser)

module.exports = router;
