const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const addUserRouter = require("./routers/addUserRouter");
const allUsersRouter = require("./routers/allUsersRouter");
const deleteUserRouter = require("./routers/deleteUserRouter");

require("dotenv").config();

class UsersServer {
  constructor() {
    this.server = null;
  }
  start() {
    this.initServer();
    this.initMiddlewares();
    this.initRouters();
    this.initDataBase();
    this.startListening();
  }
  initServer() {
    this.server = express();
  }
  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(cors({ origin: process.env.BASE_URL }));
  }
  initRouters() {
    this.server.use("/api/users", allUsersRouter);
    this.server.use("/api/addUser", addUserRouter);
    this.server.use("/api/users", deleteUserRouter);
  }

  async initDataBase() {
    try {
      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
      console.log("Database connected!!!");
    } catch (error) {
      console.log(error);
    }
    mongoose.connection.on("error", (err) => {
      logError(err);
      process.exit(1);
    });
  }

  startListening() {
    const PORT = process.env.PORT || 3000;
    this.server.listen(PORT, () => {
      console.log(`Server is running on port - ${PORT}`);
    });
  }
}
module.exports = UsersServer;
