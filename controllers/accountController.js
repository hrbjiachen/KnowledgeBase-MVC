const showPage = (req, res) => {
  res.redirect("login");
};

const showLoginPage = (req, res) => {
  res.render("login", { loginCSS: true });
};

const register = (req, res) => {
  console.log(req.body);
};

const continueSignup = (req, res) => {
  res.render("signup", { loginCSS: true, signupInfo: req.body });
};

module.exports = {
  showPage,
  showLoginPage,
  register,
  continueSignup
};
