const express = require("express");
const { login } = require("../controllers/UserController");

const router = express.Router();

router.post("/v1/user/token", login);

module.exports = router;
