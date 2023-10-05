const mongoose = require('mongoose')

async function connectMongodb(url){
    return mongoose.connect(url).then(()=>{
        console.log(`MongoDB is connected successfully!!!`);
    }).catch((err)=>{
        console.error(`Failed to connect MongoDB: ${err}`);
    })
}

module.exports = {
    connectMongodb,
}