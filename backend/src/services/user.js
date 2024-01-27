import { v4 as uuidv4 } from "uuid";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import User from "../models/user.js";

export const checkUser = async (email) => {
  const user = await User.findOne({ email: email });
  return Boolean(user);
};
export const findUser = async (email, password) => {
  const user = await User.findOne({ email: email }).exec();
  console.log("services-user-findUser-user, password", user);
  const checkPassword = bcrypt.compare(password, user.password);
  console.log("services-user-findUser-checkPassword", checkPassword);
  const token = nanoid(256);
  return { checkUser: checkPassword, token: token };
};

export const createNewUser = async (email, password) => {
  console.log("service-createUser-email,password", email, password);
  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = uuidv4();
  const token = nanoid(256);
  const newUser = User({
    userId: userId,
    email: email,
    password: hashedPassword,
  });
  const savedUser = await newUser.save();
  console.log("signup-saved", saved, "token", token);
  return { savedUser, token: token };
};
