const express = require ('express')
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const auth = require ('./routes/api/auth')
const evenement = require('./routes/api/evenement')
const todaysEvents = require ('./routes/api/todayEvents')
const upcomingevents = require ('./routes/api/upcomingEvents')
const fileUpload = require('express-fileupload')
const BodyParser = require ('body-parser')
const assert = require ('assert')


const connectDB= require ('./config/db')
const app = express()


//connection to data base 
// const db = require ('./config/db.js').mongoURI
connectDB()
// init middleware 
app.use(express.json({ exntended:false}))
app.use(fileUpload())
app.use(BodyParser.json())
var cors = require('cors');
app.use(cors());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin',"*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

//Use Route
app.use('/api/auth',auth)
app.use('/api/users',users)
app.use('/api/profiles',profile)
app.use('/api/evenement',evenement)
app.use('/api/todaysevents',todaysEvents)
app.use('/api/upcomingevents',upcomingevents)



app.listen(4000, (err) => {
    console.log ('server is online ')
})
