const mongoose = require('mongoose')
const Schema=mongoose.Schema

const EvenementSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    userMail:{
        type:String,
    },
    eventDesc:{  //description 
        type:String,
        required: true
    },
    name:{ //user ili habet
        type:String,
        required:true
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
       
    }],
    // comments:[  //  
    //     {
    //         user:{
    //             type:Schema.Types.ObjectId,
    //             ref:'users'
    //         } ,
    //         text:{ 
    //             type:String,
    //             required: true
    //         },
    //         name:{
    //             type:String,
    //         },
    //         avatar:{
    //             type:String
    //         },
    //         date:{
    //             type:Date,
    //             defaul:Date.now
    //         }
    //     }
    // ]
})


module.exports = Evenement = mongoose.model ('evenement',EvenementSchema);
