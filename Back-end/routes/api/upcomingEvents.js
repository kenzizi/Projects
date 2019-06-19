const express = require('express')
const router = express.Router();
const Upcomingevents = require('../../models/upcomingEvent')
const Evenement=require('../../models/evenement')
const fileUpload = require('express-fileupload')
const BodyParser = require ('body-parser')
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
  


 Evenement.find({ }, function  (err, data) {
    if (err) return handleError(err);
   
    Upcomingevents.collection.deleteMany({})

    data.map((el,i)=> {
        
     let dataDate = Number(el.time[0].startDate.slice(8,10))
     if (dataDate > Number(day) ){
        const newUpevent = new Upcomingevents({
                    eventDesc:el.eventDesc,
                    imgName:el.imgName,
                    imgPath:el.imgPath,
                    region:el.region,
                    name:el.name,
                    userMail:el.userMail,

                    avatar:el.avatar,
                    user:el.id,
                    time:el.time,
                    eventName:el.eventName,
                    categorie:el.categorie
                })
                const data =  newUpevent.save()
                console.log('saved,upcoming')
            }
    })

  });
  

});
const app= express() 
app.use(fileUpload())
app.use(BodyParser.json())

//@route Get api/upcomingevents
//@desc get all upcoming events
//@access public
router.get('/all' , async (req,res)=>{
  try {
      const upEvent=await Upcomingevents.find().sort({date:-1}) // the recent most recent 
      res.json(upEvent)
  } catch (err) {
      console.error(err.message)
      return res.status(500).send('ServerError')
  }
});

module.exports = router;