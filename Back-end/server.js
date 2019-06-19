const express = require ('express')
const {MongoClient,ObjectID} = require ('mongodb')
const BodyParser = require ('body-parser')
const assert = require ('assert')
const app = express()
app.use(BodyParser.json())
const mongo_url = 'mongodb://localhost:27017'
const database = 'EventsDB'
const fileUpload = require('express-fileupload')
app.use(fileUpload())

var cors = require('cors');
app.use(cors());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin',"*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

MongoClient.connect(mongo_url,{ useNewUrlParser: true},(err,client)=>{
    assert.equal(err,null,'data base conenction failed')    
    const db = client.db(database)

//  app.get('/categories',( req, res) =>{
//     db.collection('Categories').find({}).toArray((err,data)=>{
//         if (err) console.log ('cannot get categories')
//         res.send(data)
//     })

//  })
//  app.get('/gettodaysevent', (req ,res)=>{
//      db.collection('TodaysEvents').find({}).toArray((err,data) => {
//          if (err) console.log ('cannot get todays events from database')
//          res.send(data)
//      })
//  })


// // in this section we uplaod and get image path and name 

// app.post('/upload', (req,res)=>{
//     if (req.files===null){
//         return res.status(400).json({msg : 'no file was uploaded'})
//     }
//     const file = req.files.imageUp;

//     file.mv(`${__dirname}/../event_demo/public/uploads/${file.name}`, err => {
//         if (err){
//             console.error(err)
//             return res.status(500).send(err)
//         }
//         // 7ajet eli béch  né5ouhom  
//         res.json({fileName:file.name,filePath:`/uploads/${file.name}` })
//     })
// })
// app.post('/newevent', (req ,res)=>{
//     let card = req.body
//     console.log("salut ",req.body)
//     db.collection('Events').insertOne(card, (err,data)=>{
//         if (err) throw err
//         console.log("inserted ")
//         res.send(" inserted")
//     })
     
// })

// app.get('/eventcards', (req ,res)=>{
//     db.collection('Events').find({}).toArray((err,data) => {
//         if (err) console.log ('cannot get Events cards from database')
//         res.send(data)
//     })
// })


})
app.listen(4000,(err)=>{
    if (err) console.log ('server not runnign problem ! ')
    else console.log ('Project server is running on port 4000')
})