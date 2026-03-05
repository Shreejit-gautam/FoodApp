express = require('express');
auth_router=require('./routes/auth.routes')
food_router=require('./routes/food.routes')
const cookieParser = require("cookie-parser");

const app=express();
app.use(cookieParser());
app.use(express.json()); // parses incoming JSON
app.get('/',(req,res)=>{res.send("hello world my friend")})
app.use('/api/auth',auth_router)
app.use('/api/food',food_router)
module.exports=app;