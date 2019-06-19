const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    avatar:{type:String,required:true},
    RegistrationDate:{type:Date,default:Date.now},
    dateOfbirth:{type:String,required:true},
    phoneNumber:{type:String,required:true},
    gender:{type:String,required:true},
})

module.exports=User=mongoose.model('users',UserSchema) // users is the collection name inside the data base 