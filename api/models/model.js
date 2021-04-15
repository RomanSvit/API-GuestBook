const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const guestSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});
const guestModel = mongoose.model("Guest", guestSchema);
module.exports = guestModel;
