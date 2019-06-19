const express = require('express')
const router = express.Router();
const TodayEvent = require('../../models/todaysEvent')
const Evenement=require('../../models/evenement')

const fileUpload = require('express-fileupload')
const BodyParser = require ('body-parser')
var cors = require('cors');
var cron = require('node-cron');

cron.schedule('* * * * *',async () => {
  console.log('running a task every minute from route '); 
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()+1
    let day = date.getDate()

    if (month<10) month ="0"+month
    if (day<10) day="0"+day


    let queryDate = year+"-"+month+"-"+day
    console.log(queryDate)


 Evenement.find({'time.startDate' : {$eq : queryDate} }, function  (err, data) {
    if (err) return handleError(err);
    // console.log('%s', data);
   
   if (data.length ===0){
    TodayEvent.collection.deleteMany({})
    console.log(data,"eli mawjoud")

   }
    data.map((el,i) => {
        TodayEvent.collection.deleteMany({})
        const newTevent = new TodayEvent({
            eventDesc:el.eventDesc,
            imgName:el.imgName,
            imgPath:el.imgPath,
            region:el.region,
            name:el.name,
            avatar:el.avatar,
            userMail:el.userMail,
            user:el.id,
            time:el.time,
            eventName:el.eventName,
            categorie:el.categorie
        })
        const data =  newTevent.save()
        console.log('saved')
     
    })
  });
  

});
const app= express() 
app.use(fileUpload())
app.use(BodyParser.json())

//@route Get api/todaysevents
//@desc get all events
//@access public
router.get('/all' , async (req,res)=>{
  try {
      const todaysEvent=await TodayEvent.find().sort({date:-1}) // the recent most recent 
      res.json(todaysEvent)
  } catch (err) {
      console.error(err.message)
      return res.status(500).send('ServerError')
  }
});

module.exports = router;