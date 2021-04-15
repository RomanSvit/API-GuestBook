const { Router } = require("express");
const router = Router();
const UsersControllers = require("../controlers/usersControllers")


router.post("/", UsersControllers.addUser);

module.exports = router;
