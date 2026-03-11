const express=require('express')
const multer =require('multer')
const middleware = require('../middleware/food.middleware')
const foodController = require('../controllers/food.controller')
const route=express.Router()
const upload = multer({ storage: multer.memoryStorage() });

route.post('/addinfo',middleware.checkPartnerAuthCookie,upload.single('video'), foodController.createvideo)
route.get('/view', foodController.getvideos)
// route.post('/addinfo',
//   middleware.checkPartnerAuthCookie,
//   upload.any(),
//   (req, res) => {
//     console.log('files', req.files);
//     console.log('req', req.body);
//     res.json({ ok: true });
//   }
// );


module.exports=route
