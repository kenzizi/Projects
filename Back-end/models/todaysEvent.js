const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const todaysEventSchema = new Schema ({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    eventDesc:{  //description 
        type:String,
        required: true
    },
    name:{ //user ili habet
        type:String,
        required:true
    },
    userMail:{
        type:String,
    },
    avatar:{
        type:String
    },
    time:[{
        startDate:{type:String,required:false},
        endDate:{type:String,required:false},
        startHour:{type:String,required:false},
        endHour:{type:String,required:false},
    }],

    imgPath:{
        type:String,
        required:true
    },

    imgName:{
        type:String,
        required:true
    },
    eventName:{
        type:String,
        required:true
    },
    categorie:{
        type:String,
        required:true
    },


    region:{
        type:String,
        required:true
    },

    date:{  //lwaket ili hbat fih lpost taa levent
        type:Date,
        default:Date.now
    },

    likes:[{  
        user:{
            type:Schema.Types.ObjectId,
            ref:'users'
        }
       
    }]
})
module.exports = TodayEvent = mongoose.model ('TodaysEvents',todaysEventSchema);
