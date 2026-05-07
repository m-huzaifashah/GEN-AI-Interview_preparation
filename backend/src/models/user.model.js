const mongoose=require('mongoose')
const bcrypt=require('bcrypt')


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'username already taken'],
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:[true,'user already exists with this email address'],
        trim:true,
    },
    password:{
        type:String,
        required:[true,'password is required'],
        select:false

    }
},{
    timestamps:true
})

userSchema.pre('save',async function(){
    if(!this.isModified('password')){
        return
    }
const hash=await bcrypt.hash(this.password,10)
this.password=hash

return

})

userSchema.methods.comparePassword=async function (password) {
    return await bcrypt.compare(password,this.password)
}

const userModel=mongoose.model('user',userSchema)
module.exports=userModel