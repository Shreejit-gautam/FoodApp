express = require('express');
cors=require('cors');
auth_router=require('./routes/auth.routes')
food_router=require('./routes/food.routes')
const cookieParser = require("cookie-parser");

const app=express();
app.use(cors());

// Or configure specific origins
app.use(
  cors({
    origin: "http://localhost:5173", // match your React dev server
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json()); // parses incoming JSON
app.get('/',(req,res)=>{res.send("hello world my friend")})
app.use('/api/auth',auth_router)
app.use('/api/food',food_router)
module.exports=app;