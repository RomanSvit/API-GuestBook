const Joi = require("joi");
const guestModel = require("../models/model");
const {
  Types: { ObjectId },
} = require("mongoose");

class UsersControllers {
  async getAllUsers(req, res, next) {
    try {
      const users = await guestModel.find();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  async addUser(req, res, next) {
    try {
      const newUser = await guestModel.create(req.body);
      res.status(201).send(newUser);
    } catch (error) {
      next(error);
    }
  }
  validateUser(req, res, next) {
    const rulesValidate = Joi.object({
      name: Joi.string().required(),
      message: Joi.string().required(),
    });
    const validation = rulesValidate.validate(req.body);
    if (validation.error) {
      res.status(400).send(validation.error);
    }
    next();
  }
  async deleteUser(req, res, next) {
    const { id } = req.params;
    try {
      const targetUser = await guestModel.findByIdAndDelete(id);
      if (!targetUser) {
        res.status(404).send("User not found");
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
  async validateId(req, res, next) {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status("400").send({ message: "Don't valid id!" });
    }
    next();
  }
}
module.exports = new UsersControllers();
