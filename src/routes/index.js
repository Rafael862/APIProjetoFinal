const { Router } = require("express");

const usersRouter = require("./users.routes");
const menuRouter = require("./menu.Routes");

const routes = Router();
routes.use("/users", usersRouter);
routes.use("/menu", menuRouter);

module.exports = routes; 