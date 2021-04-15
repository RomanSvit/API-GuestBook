const Joi = require("joi");
const db = require("../../db.json");
const users = db;

class UsersControllers {
  static getAllUsers(req, res, next) {
    return res.json(users);
  }

  static addUser(req, res, next) {
    const rulesValidate = Joi.object({
      name: Joi.string().required(),
      message: Joi.string().required(),
    });
    const validation = rulesValidate.validate(req.body);
    if (validation.error) {
      res.status(400).send(validation.error);
    } else {
      const newUser = { id: users.length + 1, ...req.body };
      users.push(newUser);
      res.status(200).send(newUser);
    }
  }
  static deleteUser(req, res, next) {
    const id = parseInt(req.params.id);
    const targetUser = users.find((elem) => elem.id === id);
    if (!targetUser) {
      res.status(404).send("User not found");
    }
    const userIndex = users.findIndex((elem) => elem.id === id);
    users.splice(userIndex, 1);
    return res.json(users);
  }
}
module.exports = UsersControllers;
