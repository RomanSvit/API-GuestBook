const express = require("express");
const mongoose = require("mongoose");

const addUserRouter = require("./routers/addUserRouter");
const allUsersRouter = require("./routers/allUsersRouter");
const deleteUserRouter = require("./routers/deleteUserRouter");

require("dotenv").config();
const PORT = process.env.PORT || 3000;

class UsersServer {
  construktor() {
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
  }
  initRouters() {
    this.server.use("/users", allUsersRouter);
    this.server.use("/addUser", addUserRouter);
    this.server.use("/users", deleteUserRouter);
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
    this.server.listen(PORT, () => {
      console.log(`Server is running at port - ${PORT}`);
    });
  }
}
module.exports = UsersServer;
