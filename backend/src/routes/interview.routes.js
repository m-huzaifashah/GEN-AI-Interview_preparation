const express=require('express')
const interviewController=require('../controllers/interview.controller')
const upload=require('../middleware/file.middleware')
const authMiddleware=require('../middleware/auth.middleware')


const interviewRouter=express.Router()

interviewRouter.post('/',authMiddleware.authUser,upload.single('resume'),interviewController.generateInterViewReportController)



module.exports=interviewRouter