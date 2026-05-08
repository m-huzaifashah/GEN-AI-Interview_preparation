const mongoose = require("mongoose");



const technicalQuestionsSchema=new mongoose.Schema({
    question:{
        type:String,
        required:[true,'question is required'],
    },
    intention:{
        type:String,
        required:[true,'intention is required']
    },
    answer:{
        type:String,
        required:[true,'answer is required']
    }
},{
    _id:false
})

const behavioralQuestionsSchema=new mongoose.Schema({
    question:{
        type:String,
        required:[true,'question is required'],
    },
    intention:{
        type:String,
        required:[true,'intention is required']
    },
    answer:{
        type:String,
        required:[true,'answer is required']
    }
},{
    _id:false
})

const skillGapSchema=new mongoose.Schema({
    skill:{
        type:String,
        required:[true,'skill is required']
    },
    severity:{
        string:true,
        enum:['low','medium','high'],
        required:[true,"severity is required"]
    }
},{
    _id:false
})


const preprationPlanSchema=new mongoose.Schema({
    day:{
        type:Number,
        required:true
    },
    focus:{
        type:String,
        required:true
    },
    tasks:{
        type:String,
required:true
    }
})

const interviewReportSchema = new mongoose.Schema({
  jobDescription: {
    type: String,
    required: [true, "jobDescription is required"],
  },
  resume: {
    type: String,
  },
  selfDescription: {
    type: String,
  },
  matchScore:{
    type:Number,
    min:0,
    max:100
  },
  technicalQuestions:[technicalQuestionsSchema],
  behavioralQuestions:[behavioralQuestionsSchema],
  skillGaps:[skillGapSchema],
  preprationPlan:[preprationPlanSchema]

},{
    timestamps:true
});


const interviewReportModel=mongoose.model('interviewReport',interviewReportSchema)

module.exports=interviewReportModel