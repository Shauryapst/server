const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const User = require("../models/user.model.js");
const Auth = require("../models/auth.model.js");

const register = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const email = req.body.email;
  const firstName = req.body?.firstName;
  const lastName = req.body?.lastName;

  const bcryptSalt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

  try {
    const createdUser = await User.create({
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
    });
    const createdAuthObject = await Auth.create({
      user: createdUser._id,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: createdUser._id, username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(201).cookie("token", token).json({
      userId: createdUser._id,
      username,
      email,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const login = async (req, res, next) => {};

module.exports = { register, login };
