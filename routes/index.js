const express = require("express");
const accountController = require("../controllers/accountController");
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const messageController = require("../controllers/messageController");

const routes = express.Router();
const postRoute = express.Router();
const userRoute = express.Router();
const messageRoute = express.Router();

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
routes.get("/signup", accountController.showLoginPage);
routes.get("/home", redirectHome, accountController.showHomePage);
routes.get("/messages", messageController.showMessagesPage);
routes.get("/messages/:id", messageController.showInitialMessagesPage)
routes.post("/filter", postController.getPostsByFilter);
routes.post("/search", postController.showSearchPage);

//account route
routes.post("/signup", accountController.continueSignup);
routes.post("/register", accountController.register);
routes.post("/login", accountController.login);
routes.post("/logout", accountController.logout);

//user route
routes.use("/user", userRoute);
userRoute.get("/all", userController.getAllUser);

//post route
routes.use("/post", postRoute);
postRoute.post("/add", postController.addPost);
postRoute.post("/reply", postController.replyPostById);
postRoute.get("/all", postController.getAllMyPosts);
postRoute.get("/:id", postController.getPostById);
postRoute.get("/user/:id", postController.getPostByUser);


//message route
routes.use("/message", messageRoute);
messageRoute.post("/user/:id", messageController.sendMessageById);
messageRoute.get("/user/:id/:subject/history", messageController.getChatHistoryById);
messageRoute.get("/all", messageController.getAllChats);


module.exports = routes;
