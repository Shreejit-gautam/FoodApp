const jwt = require('jsonwebtoken');
const foodpartnermodel = require('../model/foodpartner.model')
const usermodel = require('../model/user.model')
// Middleware to check cookie
async function checkPartnerAuthCookie(req, res, next) {
  try {
    // Read cookie (assuming cookie-parser is used)
    const token = req.cookies?.token; // replace 'authToken' with your cookie name
    console.log(req.cookies)
    if (!token) {
      return res.status(401).json({ error: "No authentication cookie found" });
    }
    console.log("-----"+req.body+"----------")
    // Verify token (replace 'yourSecretKey' with your actual secret)
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    const parner_info= await foodpartnermodel.findById(decoded.id);
    // Attach decoded data to request for later use
    req.user = parner_info;
    next(); // pass control to next middleware/route
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired cookie" });
  }
}
async function checkUserAuthCookie(req, res, next) {
  try {
    // Read cookie (assuming cookie-parser is used)
    const token = req.cookies?.token; // replace 'authToken' with your cookie name

    if (!token) {
      return res.status(401).json({ error: "No authentication cookie found" });
    }
   
    // Verify token (replace 'yourSecretKey' with your actual secret)
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    const user_info= await usermodelmodel.findById(decoded.id);
    // Attach decoded data to request for later use
    req.user = user_info;
    next(); // pass control to next middleware/route
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired cookie" });
  }
}

module.exports = {checkUserAuthCookie,checkPartnerAuthCookie};