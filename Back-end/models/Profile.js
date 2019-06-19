const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema ( {
    user : {
        type : Schema.Types.ObjectId,
        ref : 'user' //ref to user model (table)
    },
    region: {
        type: String,
        required :true
    },
    tel: {
        type : String,
        required : true 
    },
    bio : {
        type: String
    }
})

module.exports = Profile = mongoose.model ('profile',ProfileSchema)