const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")

async function authUser(req,res,next) {

    const token=req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Token not found"
        })
    }
    const isBlacklisted=await tokenBlacklistModel.findOne({token})

    if(isBlacklisted){
        return res.status(400).json({
            message:'token blacklisted'
        })
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        
        req.user=decoded.id
next()

    }catch(err){
        res.status(404).json({
            message:'invalid Token'
        })
    }


}

module.exports={authUser}