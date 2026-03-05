const usermodel = require('../model/user.model');
const foodpartnermodel = require('../model/foodpartner.model');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function registeruser(req,res)
{try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await usermodel.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "User with this username or email already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await usermodel.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await usermodel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ error: "User not found" });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
  { id: existingfoodpartner._id },   // payload
  process.env.SECRETKEY)
    res.cookie('token',token)
    // If valid, you can return user info or generate a token (JWT)
    res.status(200).json({ message: "Login successful", user: existingUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
function logoutuser(req,res)
{
  res.clearcookie('token');
  res.status(200).json({message:"User logout Successfully"});
}
async function registerfoodpartner(req,res)
{try {
    const { foodpartnername, email, password } = req.body;

    // Check if foodpartner already exists
    const existingfoodpartner = await foodpartnermodel.findOne({ $or: [{ foodpartnername }, { email }] });
    if (existingfoodpartner) {
      return res.status(400).json({ error: "foodpartner with this foodpartnername or email already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new foodpartner
    const newfoodpartner = await foodpartnermodel.create({ foodpartnername, email, password: hashedPassword });

    res.status(201).json({ message: "foodpartner created successfully", foodpartner: newfoodpartner });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
async function loginfoodpartner(req, res) {
  try {
    const { email, password } = req.body;

    // Check if foodpartner exists
    const existingfoodpartner = await foodpartnermodel.findOne({ email });
    if (!existingfoodpartner) {
      return res.status(400).json({ error: "foodpartner not found" });
    }
    
    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, existingfoodpartner.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
  { id: existingfoodpartner._id },   // payload
  process.env.SECRETKEY)
    res.cookie('token',token)
    // If valid, you can return foodpartner info or generate a token (JWT)
    res.status(200).json({ message: "Login successful", foodpartner: existingfoodpartner });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
function logoutfoodpartner(req,res)
{
  res.clearCookie('token');
  res.status(200).json({message:"User logout Successfully"});
}
// console.log("working properly")
module.exports={registeruser,loginUser,registerfoodpartner,loginfoodpartner,logoutfoodpartner,logoutuser}
