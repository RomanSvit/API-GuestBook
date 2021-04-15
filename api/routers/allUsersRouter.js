const { Router } = require("express");
const router = Router();
const UsersControllers = require("../controlers/usersControllers");

router.get("/", UsersControllers.getAllUsers);
module.exports = router;
