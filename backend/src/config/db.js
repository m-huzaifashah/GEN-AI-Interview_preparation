const mongoose=require('mongoose')

async function connectDb() {
    try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Db connected')
    }catch(err){
        console.log('Db not connected due to an error \n')
        console.error('error :',err)
    }
}

module.exports=connectDb