const bcrypt = require("bcrypt");
const { User } = require("../models/models");

class AuthController {
  static async register(req, res) {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json("Some data are missing!");
    }

    try {
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return res.status(400).json("This email is taken!");
      }

      const hashPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        firstname,
        lastname,
        email,
        password: hashPassword
      });

      return res.json(user);
    } catch (error) {
      return res.status(500).json("Unexpected error!");
    }
  }
}

module.exports = AuthController;
