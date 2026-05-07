const userModel=require('../models/user.model')
const jwt=require('jsonwebtoken')
const tokenBlacklistModel=require('../models/blacklist.model')



async function registerUserController(req,res) {
    const {username,email,password}=req.body

    if(!username||!email||!password){
        return res.status(400).json({
            message:"all fields are required"
        })
    }

    const userExists=await userModel.findOne({
        $or:[{email},{username}]
    })

    if(userExists){
        return res.status(400).json({
            message:'user already exists'
        })
    }

    const user=await userModel.create({
        username,
        email,
        password
    })
const token=jwt.sign({
    id:user._id,
    username:user.username

},process.env.JWT_SECRET,{expiresIn:'1d'})

res.cookie('token',token)

    res.status(200).json({
        message:'user created successfully',
        user:{
        id:user._id,
        username:user.username,
        email:user.email
    }
    })
    
}

async function loginUserController(req,res){
    const {email,password}=req.body
if(!email||!password){
    return res.status(400).json({
        message:'all fields are required'
    })
}

const user=await userModel.findOne({email}).select('+password')

if(!user){
    return res.status(400).json({
        message:'user does not exists'
    })
}

const checkPassword=await user.comparePassword(password)

if(!checkPassword){
    return res.status(400).json({
        message:'incorrect password'
    })
}
const token=jwt.sign({
    id:user._id,
    username:user.username
},process.env.JWT_SECRET,{expiresIn:"1d"})

res.cookie('token',token)




res.status(200).json({
    message:'user logged In successfully',
    user:{
        id:user._id,
        username:user.username,
        email:user.email
    }
})


}



async function logoutUserController(req,res) {

    const token =req.cookies.token

    if(!token){
        return res.status(400).json({
            message:"no user  is logged  in!!"
        })
    }
    await tokenBlacklistModel.create({token})
    res.clearCookie('token')

    res.status(200).json({
        message:'user logged out successfully'
    })

}

async function getMeController(req,res){

    const user=await userModel.findOne({_id:req.user})

    res.status(200).json({
        message:'success',
        user
    })
}


module.exports={registerUserController,loginUserController,logoutUserController,getMeController}

