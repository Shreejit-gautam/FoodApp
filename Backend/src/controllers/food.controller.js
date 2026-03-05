const foodvideomodel = require('../model/foodvideo.model')
const storage=require('../services/storage.services.js')
const {v4:uuid}=require('uuid')
async function createvideo(req,res)
{try {
    const { title, description} = req.body;

    // Check if user already exists
   
    // Hash password before saving
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    console.log(req.body)
    console.log(req.file)
    const user_info=req.user;
    file_info= await storage.uploadFile(req.file.buffer,uuid());
    const user_id=user_info._id;
    const videofile=file_info.url
    const newUser = await foodvideomodel.create({ title: title,description: description, videofile:videofile , foodPartner:user_id});

    res.status(201).json({ message: "User created successfully",user: newUser });
// console.log(req.user);  
} catch (err) {
    res.status(400).json({ error: err.message });
  }
 
}
module.exports={createvideo}