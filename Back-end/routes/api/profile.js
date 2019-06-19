const express = require('express')
const router = express.Router()
const auth = require ('../../middleware/auth')
const {check , validationResult} = require ('express-validator/check')


//bring the module 

const Profile = require ('../../models/Profile')
const User = require ('../../models/user')
// @route   GET api/profiles/me
// @desc    get current user  profile
// @acess   Private 


router.get('/me', auth, async (req,res)=>{
    try {
        const profile = await Profile.findOne({
            user : req.user.id
        }).populate('user',['name','avatar']) //tzid name avatar lel profile
        if (!profile) {
            return res.status(400).json ({msg : 'there is no profile for this user'})
        }

        res.json(profile)



    } catch (err) {
        console.error(err.message) 
        res.status(500).send('server error')
    }
})

// @route   POST api/profiles
// @desc    create or update user profile
// @acess   Private 


router.post('/me',[auth,[
    check ('region' , 'please include ur region ')
        .not()
        .isEmpty(),
    check('tel','please write your phone number')
        .isLength({min:8})

]],async (req ,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400)
            .json({
                errors:errors.array()
            })
    }
    const {tel,region} = req.body
    //build profile object to save into db 

    const userProfile = {
        user:req.user.id, // token lib3aththa
        region,
        tel
    };
  //Profile is the model
    try {
        let profile= await Profile.findOne({user : req.user.id})
        if (profile) {
            //update it 
            profile = await Profile.findOneAndUpdate({user:req.user.id},
                {$set : userProfile },
                {new:true});

            return res.json(profile)

        }
        //create it 

         profile = new Profile(userProfile)
        await profile.save()
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).json('server error')
    }
})
// @route   GET api/profiles
// @desc    GET all profiles
// @acess   public 

router.get('/', async (req ,res ) => {
    try {
        const profiles = await Profile.find().populate('User',['name','avatar']);
        res.json(profiles)
    } catch (err) {
        console.error(err.message)
        res.status(500).json ('server error ')
    }
})
// @route   GET api/profiles/user/:user_id
// @desc    GET Profile by user id
// @acess   public 
router.get('/user/:user_id' , async (req,res) => {
    try {
        const profile = await Profile.findOne({user:req.params.user_id}).populate('User',['name,avatar'])
        if (!profile){
            res.status(400).json({msg:'Profile not found'})
        }
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        if (err.kind === 'ObjectId'){
            res.status(500).json('Profile not found ')

        }
        res.status(500).json('server error')

    }
})
// @route   DELETE api/profiles/delete
// @desc    DELETE Profile by user id
// @acess   private 

router.delete('/delete' ,auth ,async (req ,res) => { 
    await Profile.findOneAndRemove({user:req.user.id})
    await User.findByIdAndRemove({_id:req.user.id})

    res.json({msg :'user was deleted'})
})
module.exports=router;