require('dotenv').config()
const app=require('./src/app')
const connectDb=require('./src/config/db')
const cors=require('cors')
const invokeGenAi=require('./src/services/ai.service')



connectDb()

invokeGenAi()
app.listen(3000,()=>{
    console.log("server is running at port 3000")
})

