const userData = require("../models/userData");
const rm = require("../util/responseMsg");

const showPage = (req, res) => {
  if (req.session.user) {
    res.redirect("home");
  } else {
    res.redirect("login");
  }
};

const showLoginPage = (req, res) => {
  res.render("login", { loginCSS: true });
};

const showHomePage = (req, res) => {
  const userInfo = req.session.user;
  res.render("home", { userInfo, homeCSS: true });
};

const continueSignup = async (req, res) => {
  const { email } = req.body;
  const [rows] = await userData.getUserByEmail(email);

  if (!rows.length) {
    res.render("signup", { loginCSS: true, signupInfo: req.body });
  } else {
    res.render("login", { loginCSS: true, signupError: true });
  }
};

const register = async (req, res) => {
  try {
    const [rows] = await userData.add(req.body);
    const userInfo = { ...req.body, user_id: rows.insertId };
    delete userInfo["password"];
    req.session.user = userInfo;
    showHomePage(req, res);
  } catch (error) {
    res.render("error", { error });
  }
};

const login = async (req, res) => {
  try {
    const [rows] = await userData.getUser(req.body);
    if (rows.length) {
      const userInfo = { ...rows[0] };
      delete userInfo["password"];
      req.session.user = userInfo;

      showHomePage(req, res);
    } else {
      res.render("login", { loginCSS: true, loginError: true });
    }
  } catch (error) {
    res.render("error", { error });
  }
};

const logout = async (req, res) => {
  req.session.user = null;
  res.json({ message: rm.SUCCESS });
};

module.exports = {
  showPage,
  showLoginPage,
  showHomePage,
  register,
  continueSignup,
  login,
  logout
};
