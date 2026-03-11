const foodvideomodel = require('../model/foodvideo.model')
const storage=require('../services/storage.services.js')
const {v4:uuid}=require('uuid')

function makeVideoId(username, videoId) {
  const slug = String(username || 'partner')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  return `${slug || 'partner'}-${String(videoId).slice(-6)}`;
}

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
    const file_info= await storage.uploadFile(req.file.buffer,uuid());
    const user_id=user_info._id;
    const videofile=file_info.url
    const newUser = await foodvideomodel.create({ title: title,description: description, videofile:videofile , foodPartner:user_id,likescount:0});

    res.status(201).json({ message: "User created successfully",user: newUser });
// console.log(req.user);  
} catch (err) {
    res.status(400).json({ error: err.message });
  }
 
}

async function getvideos(req, res) {
  try {
    const videos = await foodvideomodel
      .find({})
      .sort({ _id: -1 })
      .limit(3)
      .populate({
        path: 'foodPartner',
        select: 'foodpartnername restaurantName'
      });

    const formattedVideos = videos
      .filter((video) => video.foodPartner)
      .map((video) => ({
        id: makeVideoId(video.foodPartner.foodpartnername, video._id),
        src: video.videofile,
        title: video.title,
        storeName: video.foodPartner.restaurantName,
        description: video.description,
        likes: video.likescount ?? 0
      }));

    res.status(200).json(formattedVideos);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports={createvideo,getvideos}
