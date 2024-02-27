const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const {email,password} = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.signup(name, email, password);
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({});
  } catch (err) {
    return next(err);
  }

  if (!users) {
    return res.status(500).json({ message: "Internal Server Eror" });
  }

  return res.status(200).json({ users });
};

const getUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    return next(err);
  }

  if (!user) {
    return res.status(400).json({ message: "User cannot be found" });
  }

  return res.status(200).json({ user });
};

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name && !email && !password) {
    return res.status(422).json({ message: "Invalid Data" });
  }
  let user;
  try {
    user = new User({
      name,
      email,
      password,
    });
    user = await user.save();
  } catch (err) {
    return res.status(500).json({ message: "Internal Server error" });
  }

  if (!user) {
    return res.status(500).json({ message: "Unable to save user" });
  }
  return res.status(201).json({ user });
};

const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, password } = req.body;
  if (!name && !email && !password) {
    return res.status(422).json({ message: "Invalid Data" });
  }
  let user;
  try {
    user = await User.findByIdAndUpdate(id, { name, email, password });
  } catch (err) {
    return next(err);
  }

  if (!user) {
    return res.status(500).json({ message: "Unable to save user" });
  }
  return res.status(200).json({ user });
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndRemove(id);
  } catch (err) {
    return next(err);
  }
  if (!user) {
    return res.status(400).json({ message: "User Cannot find" });
  }
  return res.status(200).json({ message: "Successfully deleted" });
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  signupUser,
};
