const express = require("express");
const routes = express.Router();
const accountController = require("../controllers/accountController");

routes.get("/", accountController.showPage);
routes.get("/login", accountController.showLoginPage);

routes.post("/signup", accountController.continueSignup);
routes.post("/register", accountController.register);

module.exports = routes;
