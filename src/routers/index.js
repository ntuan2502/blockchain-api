const indexController = require("../controllers/IndexController");
const userRouter = require("./user");
const authRouter = require("./auth");

function route(app) {
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/", indexController.index);
}

module.exports = route;
