const mongoose = require ('mongoose') 
const Schema = mongoose.Schema

const EventsSchema = new Schema ( { 
    user : {
        type:Schema.Types.ObjectId,
        ref :'user'
    },
    eventName: {
        type:String,
        required : true
    },
    region : {
        type:String,
        required : true
    },
    categorie : {
        type : String,
        required : true 
    },
   
    timeTable : [
        {
            startDate : {
                type: String,
                required : true
            },
            startTime : {
                type : String,
                required:true
            },
            endDate : {
                type : String ,
                required : true 
            },
            endTime : {
                type : String , 
                required : true
            }
        }
    ]
})

module.exports = Events = mongoose.model ('Events',EventsSchema)