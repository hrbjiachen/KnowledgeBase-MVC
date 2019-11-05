const express = require("express");
const session = require("express-session");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes");
const expressHbs = require("express-handlebars");
const path = require("path");
require("dotenv/config");

const { PORT, NODE_ENV, SESS_NAME, SESS_SECRET } = process.env;

app.engine(
  "hbs",
  expressHbs({
    layoutsDir: "views/layouts/",
    defaultLayout: "main-layout",
    extname: "hbs"
  })
);
app.set("view engine", "hbs");
app.set("views", "views");

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
      sameSite: true,
      secure: NODE_ENV === "production"
    }
  })
);

// router, home page and static folder
app.use(routes);
app.use(express.static(path.join(__dirname, "public")));

// start server
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}.`);
});
