const { Router } = require("express");
const router = Router();
const usersControllers = require("../controlers/usersControllers");

router.get("/", usersControllers.getAllUsers);
module.exports = router;
