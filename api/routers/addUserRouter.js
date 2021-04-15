const { Router } = require("express");
const router = Router();
const usersControllers = require("../controlers/usersControllers");

router.post("/",usersControllers.validateUser, usersControllers.addUser);

module.exports = router;
