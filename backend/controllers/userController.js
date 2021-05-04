const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");

function generateJwt(id, email, role) {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h"
  });
}

class UserController {
  async register(req, res) {
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
      const token = generateJwt(user.id, email);
      return res.json({ token });
    } catch (error) {
      return res.status(500).json("Unexpected error!");
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("Some data are missing!");
    }

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json("Incorect email or password!");
      }

      const token = generateJwt(user.id, email);
      return res.json({ token });
    } catch (error) {
      return res.status(500).json("Unexpected error!");
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (error) {
      console.log(error);
    }
  }

  async getProfile(req, res) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json("Not logged in!");
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const {
      firstname,
      lastname,
      email,
      createdAt,
      updatedAt
    } = await User.findOne({ where: { email: decoded.email } });
    return res.json({ firstname, lastname, email, createdAt, updatedAt });
  }
}

module.exports = new UserController();
