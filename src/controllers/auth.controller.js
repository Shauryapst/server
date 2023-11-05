const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const User = require("../models/user.model.js");
const Auth = require("../models/auth.model.js");
const {
  sendNotFound,
  sendUnauthorized,
  sendOK,
  sendCreated,
} = require("../helpers/response.helper.js");

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
    res.setHeader('sessionToken', token);
  
    return sendCreated(res, null, 'successful login', {
      userId: createdUser._id,
      username,
      email,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const login = async (req, res, next) => {
  const password = req.body.password;
  const email = req.body.email;

  const bcryptSalt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

  try {
    const user = await User.findOne({
      email: email,
    });
    console.log(user);
    if (!user) {
      return sendNotFound(res, "User Not Found", "User is not Registered");
    }
    const auth = await Auth.find({
      user: user._id,
      password: hashedPassword,
    });

    if (!auth) {
      return sendUnauthorized(
        res,
        "Incorrect Password",
        "User entered incorrect password"
      );
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.setHeader('sessionToken', token);
    return sendOK(res, null, 'successful login', {
      userId: user._id,
      username : user.username,
      email,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { register, login };
