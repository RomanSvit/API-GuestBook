const { Router } = require("express");
const router = Router();
const UsersControllers = require("../controlers/usersControllers");

router.delete("/:id", UsersControllers.deleteUser);

module.exports = router;
