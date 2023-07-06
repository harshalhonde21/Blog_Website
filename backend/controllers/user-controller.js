import User from "../model/User.js";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }
  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  // Create a new user object with the data received in request body and save it to database using

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "user already exists ! login insted" });
  }

  const hashedPassword = bcrypt.hashSync(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    blogs : [],
  });

  try {
    await user.save();
  } catch (error) {
    return console.log(error);
  }
  return res.status(201).json({ user });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUsers;
  try {
    existingUsers = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }

  if (!existingUsers) {
    return res
      .status(404)
      .json({ message: "not find user by this email i am login" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password,existingUsers.password)
  if(!isPasswordCorrect){
    return res.status(400).json({message:"Incorrect password"})
  }
  return res.status(200).json({message:"login successfull", user: existingUsers});

};
