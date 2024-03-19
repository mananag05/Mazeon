const mongoose = require("mongoose");


async function ConnectMongoAtlas (url){
    try{
        console.log("Connecting To Mongo...")
        return await mongoose.connect(url)
    } catch (err) {
        console.error("'Error" , err)
        throw err
    }
   
}
module.exports = ConnectMongoAtlas;
