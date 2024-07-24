const express = require("express");
const registerUser = require("../service/registerUserService");
const loginUser = require("../service/loginUserService");
const updateUser = require("../service/profileUserService");
const deleteUser = require("../service/deleteUserService");
const {validateRegister, validateLogin, validateToken, validateUser} = require("../middleware/validateInput");
const router = express.Router();

router.post("/auth/login", validateLogin, loginUser);
router.post("/auth/register", validateRegister, registerUser)

router.put("/user/profile", validateToken, updateUser)
router.delete("/user/delete", validateUser, deleteUser)

module.exports = router;