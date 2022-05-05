const User = require("../models/User");
const validator = require("email-validator");
const bcrypt = require("bcrypt");
const authenticate = require("../authenticate");

module.exports = class AuthService {
  async login(email, password, code) {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user ? user.password : ""))) {
      const jwt = authenticate.getToken(user);
      return JSON.stringify({
        code,
        success: true,
        message: "",
        data: {
          user,
          jwt,
        },
      });
    } else {
      return JSON.stringify({
        code,
        success: false,
        message: "Incorrect email or password",
      });
    }
  }

  async register(email, password, code) {
    if (validator.validate(email) === false)
      return JSON.stringify({
        code,
        success: false,
        message: "Email address is invalid",
      });
    if (!password)
      return JSON.stringify({
        code,
        success: false,
        message: "Empty password",
      });

    const user = await User.findOne({ email });
    if (user) {
      return JSON.stringify({
        code,
        success: false,
        message: "The email already exists!",
      });
    }

    const newUser = new User({ email });
    newUser.password = bcrypt.hashSync(password, 10);
    await newUser.save();

    return JSON.stringify({
      code,
      success: true,
      message: "Successful account registration.",
    });
  }
};
