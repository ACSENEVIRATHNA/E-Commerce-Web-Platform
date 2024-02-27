const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
  },
  { timestamps: true }
);

//static signup method
userSchema.statics.signup = async function (name, email, password) {
  if (!name || !email || !password) {
    throw Error("All fields must be filed");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong inough");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email alredy used");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name, email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filed");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect E-mail");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect Password");
  }
  return  user;
};

module.exports = mongoose.model("User", userSchema);
