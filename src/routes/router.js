const express = require("express");
const registerUser = require("../service/registerUserService");
const loginUser = require("../service/loginUserService");
const updateUser = require("../service/profileUserService");
const deleteUser = require("../service/deleteUserService");
const {validateRegister, validateLogin, validateUser} = require("../middleware/validateInput");
const authToken = require("../middleware/authToken");
const router = express.Router();

router.post("/auth/register", validateRegister, registerUser)
router.post("/auth/login", validateLogin, loginUser);

router.put("/user/profile", authToken, updateUser)
router.delete("/user/delete", authToken, validateUser, deleteUser)

module.exports = router;