const express = require("express");
const accountController = require("../controllers/accountController");
const userController = require("../controllers/userController");

const routes = express.Router();
const userRoute = express.Router();

const redirectHome = (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/");
  } else {
    next();
  }
};

//get pages
routes.get("/", accountController.showPage);
routes.get("/login", accountController.showLoginPage);
routes.get("/home", redirectHome, accountController.showHomePage);

//account route
routes.post("/signup", accountController.continueSignup);
routes.post("/register", accountController.register);
routes.post("/login", accountController.login);
routes.post("/logout", accountController.logout);

//user route
routes.use("/user", userRoute);
userRoute.get("/all", userController.getAllUser);
module.exports = routes;
