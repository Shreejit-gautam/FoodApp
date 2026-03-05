const ImageKit = require("imagekit");
require('dotenv').config()
const imagekit = new ImageKit({
publicKey: process.env.publicKey,
privateKey:process.env.privateKey,
urlEndpoint: process.env.urlEndpoint

});

async function uploadFile(file, fileName){
const result = await imagekit. upload({
file: file, // required
fileName: fileName, // required

})

return result; // Return the URL of the uploaded file
}
module.exports={uploadFile}
