const { Router } = require("express");
const router = Router();
const usersControllers = require("../controlers/usersControllers");

router.delete("/:id",usersControllers.validateId, usersControllers.deleteUser);

module.exports = router;
