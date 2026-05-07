const express=require('express')
const authControlers=require('../controllers/auth.controller')
const { authUser } = require('../middleware/auth.middleware')

const router=express.Router()

router.post('/register',authControlers.registerUserController)
router.post('/login',authControlers.loginUserController)
router.get('/logout',authControlers.logoutUserController)
router.get('/get-me',authUser,authControlers.getMeController)

module.exports=router