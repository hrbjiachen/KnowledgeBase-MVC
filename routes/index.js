const express = require("express");
const accountController = require("../controllers/accountController");
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const profileController = require("../controllers/profileController");
const messageController = require("../controllers/messageController");

const routes = express.Router();
const postRoute = express.Router();
const userRoute = express.Router();
const editRoute = express.Router();
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
routes.get("/messages", redirectHome, messageController.showMessagesPage);
routes.get("/profile/:id", redirectHome, profileController.showProfilePage);
routes.get(
  "/messages/:id",
  redirectHome,
  messageController.showInitialMessagesPage
);
routes.post("/filter", postController.getPostsByFilter);
routes.post("/search", postController.showSearchPage);

//account route
routes.post("/signup", accountController.continueSignup);
routes.post("/register", accountController.register);
routes.post("/login", accountController.login);
routes.post("/logout", accountController.logout);

//user route
routes.use("/user", userRoute);
userRoute.get("/all", redirectHome, userController.getAllUser);

//post route
routes.use("/post", postRoute);
postRoute.post("/add", postController.addPost);
postRoute.post("/reply", postController.replyPostById);
postRoute.get("/all", redirectHome, postController.getAllMyPosts);
postRoute.get("/:id", redirectHome, postController.getPostById);
postRoute.get("/user/:id", redirectHome, postController.getPostByUser);

//message route
routes.use("/message", messageRoute);
messageRoute.post("/user/:id", messageController.sendMessageById);
messageRoute.get(
  "/user/:id/:subject/history",
  redirectHome,
  messageController.getChatHistoryById
);
messageRoute.get("/all", redirectHome, messageController.getAllChats);

//edit rout

routes.use("/edit", editRoute);
editRoute.get("/profile", redirectHome, profileController.editProfilePage);
editRoute.post("/:col", profileController.editProfileInfo);
editRoute.post("/likes/add", profileController.addLike);

module.exports = routes;
