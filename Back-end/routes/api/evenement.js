const express = require('express')
const router = express.Router();
const {check, validationResult} = require ('express-validator/check')
const auth = require('../../middleware/auth')
const User=require('../../models/user')
const Evenement=require('../../models/evenement')
const fileUpload = require('express-fileupload')
const BodyParser = require ('body-parser')
var cors = require('cors');

const app= express()
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
//@route Get api/evenement/
//@desc get all today's events
//@access public 


  router.get('/todays' , async (req,res)=>{
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()+1
    let day = date.getDate()

    if (month<10) month ="0"+month
    if (day<10) day="0"+day


    let queryDate = year+"-"+month+"-"+day
    try {
        const todays =await Evenement.find({'time.startDate' : {$eq : queryDate} }, function  (err, data) {
            if (err) return handleError(err);
         
            console.log('todays')
          });
          res.json(todays)

    } catch (err) {
        console.error(err.message)
        return res.status(500).send('ServerError')
    }
});

//@route Get api/evenement/
//@desc get all upcoming events
//@access public 


router.get('/upcoming' , async (req,res)=>{
    let date = new Date()
    let day = date.getDate()
    let Tab = []
    try {
        const upcoming =await Evenement.find({ }, function  (err, data) {
            if (err) return handleError(err);        
            data.map((el,i)=> {
                
             let dataDate = Number(el.time[0].startDate.slice(8,10))
             console.log('what i slices from upcoming',dataDate)
             if (dataDate > Number(day) ){
                    Tab.push(el)
                    }
            })
            console.log('the upcoming ' , Tab)
          });   
          res.json(Tab)
    } catch (err) {
        console.error(err.message)
        return res.status(500).send('ServerError')
    }
});



// @route Post api/evenement
// @desc  upload image 
// @access Private

router.post('/upload', (req,res)=>{
    if (req.files===null){
        return res.status(400).json({msg : 'no file was uploaded'})
    }
    const file = req.files.imageUp;

    file.mv(`${__dirname}/../../../event_demo/public/uploads/${file.name}`, err => {
        if (err){
            console.error(err)
            return res.status(500).send(err)
        }
        // 7ajet eli béch  né5ouhom  
        res.json({fileName:file.name,filePath:`/uploads/${file.name}` })
    })
})

//@route Get api/evenement
//@desc get all events
//@access Private

// @route Post api/evenement
// @desc Create an event
// @access Private

router.post('/add',
[ 
    auth,
    [
    check('eventDesc','eventDesc is required').not().isEmpty(),
    check('region','region is required').not().isEmpty(),
     ]
],

async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty())
    {
        res.status(400).json({errors:errors.array()});   
    }
    
    try {


        const user = await  User.findById(req.user.id).select('-password');
        console.log('the user',user)
        const newEvent= new Evenement ({
            eventDesc:req.body.eventDesc,
            imgName:req.body.imgName,   
            imgPath:req.body.imgPath,
            region:req.body.region,
            name:user.name,
            userMail:user.email,
            avatar:user.avatar,
            user:req.user.id,
            time:req.body.selectedTime,
            eventName:req.body.eventName,
            categorie:req.body.categorie
        })

        const event= await newEvent.save()

        res.json(event)
        console.log('here4')

    } catch (err) {
        console.error(err.message)
        res.status(500).send('ServerError')
    }

   
                  
}

);

//@route Get api/evenement
//@desc get all events
//@access Private
router.get('/', auth , async (req,res)=>{
    try {
        const events=await Evenement.find().sort({date:-1}) // the recent most recent 
        res.json(events)
    } catch (err) {
        console.error(err.message)
        return res.status(500).send('ServerError')
    }
});

//@route Get api/evenement/:id

//@desc get event by ID
//@access public
router.get('/:id' , async (req,res)=>{
    try {
        const event=await Evenement.findById(req.params.id) 
       if(!event){
           return res.status(404).json({msg:'Event not found'})
       }
        res.json(event)

    } catch (err) {
        console.error(err.message)
        
        if(err.kind=== 'ObjectId'){
            return res.status(404).json({msg:'Event not found'})
        }

        return res.status(500).send('ServerError')
    }
});


//@route DELETE api/evenement/:id
//@desc delete event
//@access Private
router.delete('/:id', auth , async (req,res)=>{
    try {
        const event=await Evenement.findById(req.params.id)
        if(!event){
            return res.status(404).json({msg:'Event not found'})
        }
        //check user
        if(event.user.toString() !== req.user.id){ //bechmayfasakh levent ken user ili habtou dsl karim 
            return res.status(401).json({msg:'User not authorized'});
        }
        await event.remove()
        res.json({msg:'event removed'})
    } catch (err) {
        console.error(err.message)
        if(err.kind=== 'ObjectId'){
            return res.status(404).json({msg:'Event not found'})
        }
        return res.status(500).send('ServerError')
    }
});


//@route PUT api/evenement/like/:id
//@desc like an  event
//@access Private
router.put('/like/:id',auth,async (req,res) =>{
   try {
       const event = await Evenement.findById(req.params.id);
       
       //check if the the post has already been liked
       if(event.likes.filter(like => like.user.toString() === req.user.id).length > 0){
           return res.status(400).json({msg:"Event already liked"})
       }

       event.likes.unshift({ user: req.user.id})
       await event.save();
       res.json(event.likes);

   } catch (err) {
    console.error(err.message)
    return res.status(500).send('ServerError')
   } 
});


//@route PUT api/evenement/unlike/:id
//@desc unlike an  event
//@access Private
router.put('/unlike/:id',auth,async (req,res) =>{
    try {
        const event = await Evenement.findById(req.params.id);
        
        //check if the the post has already been liked
        if(event.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({msg:"Event not liked"})
        }
 
        //Get Remove index
        const removeIndex= event.likes.map(like => like.user.toString()).indexOf(req.user.id)
        event.likes.splice(removeIndex,1)

        await event.save();
        res.json(event.likes);
 
    } catch (err) {
     console.error(err.message)
     return res.status(500).send('ServerError')
    } 
 });

//@route PUT api/evenement/time
//@desc Add event time
//@access Private
router.put('/time/:id',[auth,
    [
       check('startDate' ,'startDate is required') 
       .not().isEmpty(),
       check('endDate' ,'endDate is required') 
       .not().isEmpty(),
       check('startHour' ,'startHour date is required') 
       .not().isEmpty(),
       check('endHour' ,'endHour date is required') 
       .not().isEmpty()
    ]
],async (req,res)=>{
    const errors=validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {
        startDate,
        endDate,
        startHour,
        endHour
           } = req.body;

       const newDate = {
           startDate,
           endDate,
           startHour,
           endHour
       };
       
       try{
          
           const event=await Evenement.findById(req.params.id)
           if(!event){
            return res.status(404).json({msg:'Event not found'})
        }
        //check user
        if(event.user.toString() !== req.user.id){ 
            return res.status(401).json({msg:'User not authorized'});
        }

           event.time.unshift(newDate)
           await event.save()
           res.json(event)
       
          

       } catch(err){
           console.error(err.message)
           if(err.kind=== 'ObjectId'){
            return res.status(404).json({msg:'Event not found'})
        }
           res.status(500).send('Server Error')
       }
  
});


//@route DELETE api/evenement/time/:exp_id
//@desc delete time from event
//@access Private
router.delete('/time/:exp_id',auth,async(req,res)=>{
    try{
        const event=await Evenement.findOne({ user:req.user.id })
        //get remove index 
        const removeIndex=event.time.map(item=>item.id).indexOf(req.params.exp_id);

        event.time.splice(removeIndex,1)
        await event.save()
        res.json(event)

    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

//@route POST api/evenement/id
//@desc Update an event
//@access Private
router.post('/:id' ,auth
 , async (req,res)=>{
    
    let modifiedEvent=req.body
    

     try{

       
            //update
            event=await Evenement.findOneAndUpdate({_id:req.params.id},
                {$set:{...modifiedEvent}}
                );
            return res.json(event)
       

       
        
     } catch(err){
        console.log(err.message);
        res.status(500).send('Server Error')
     }

  
});


module.exports = router;