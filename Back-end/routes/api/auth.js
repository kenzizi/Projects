const express = require ('express');
const router = express.Router()
const auth = require ('../../middleware/auth')
const jwt = require ('jsonwebtoken')
const config = require ('config')
const bcrypt = require ('bcryptjs')
// look for documentation more later
const { check, validationResult} = require ('express-validator/check')

const User = require ('../../models/user')
// @route   get api/auth
// @desc     Test Route
// @acess   public

router.get('/',auth, async (req ,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})
// verify user to log in 

// @route   POST api/auth
//@desc     Authenticate user and get token 
//@acess    Public
router.post('/',[
    check('email', 'please include a valid email adress')
        .isEmail(),
    check('password', 'Password is required')
        .exists()
],async ( req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
  
    const {email,password} = req.body;
    try{

        let user = await User.findOne({email:email});
        if (!user){
            return res.status(400).json({error: [{msg: 'Invalid Credentials'}]})
        }

       const isMatch = await bcrypt.compare(password,user.password);
       if (!isMatch){
        return res.status(400).json({error: [{msg :'Invalid password'}]})
       }

    //return json token

    const payload = {
        user : {
            id: user.id, //mongoose we use id mongo db we use _id 

        }
    }
    jwt.sign(
        payload,
        config.get('jwtSecret'),
        {expiresIn : 360000},
        (err,token) => {
            if (err) throw (err)
            res.json({token})
        }
        )


    }catch(err){
        console.log(error.message)
        res.status(500).send('server error')
    }
   

})



module.exports = router