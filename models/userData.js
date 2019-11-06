const db = require("../util/database");

// Add a single individual to the database
const add = async data => {
  const {
    fname,
    lname,
    email,
    password,
    imgurl,
    description,
    country,
    bday
  } = data;

  return await db.query(
    "Insert into user (password, email, fname, lname, imgurl, description, country, birthday) values (?,?,?,?,?,?,?,?)",
    [password, email, fname, lname, imgurl, description, country, bday]
  );
};

const getAll = async () => {
  return await db.execute("Select * from user");
};

const getUserById = async id => {
  return await db.execute("Select * from user where id = " + id);
};

//get user by email and password
const getUser = async info => {
  const { email, password } = info;
  return await db.execute(
    "Select * from user where email = ? and password = ?",
    [email, password]
  );
};

const getUserByEmail = async email =>
  await db.execute("Select * from user where email = ?", [email]);

module.exports = {
  add,
  getAll,
  getUserById,
  getUser,
  getUserByEmail
};
