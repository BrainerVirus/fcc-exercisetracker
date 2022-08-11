import "../db/db.js";
import User from "../models/userModel.js";

export const createUser = async (req, res) => {
  try {
    const username = req.body.username;
    const user = await User.create({ username });
    res.status(201).json({ username: user.username, _id: user._id });
  } catch (error) {
    res.status(500).json({ message: "username is already registered" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "could not get users" });
  }
};

export const getUserByIdThroughBodyReq = async (req, res, next) => {
  try {
    const user = await User.findById(req.params._id);
    req.user = {
      username: user.username,
      _id: user._id,
    };
    next();
  } catch (error) {
    res.status(500).json({ message: "could not get user" });
  }
};
