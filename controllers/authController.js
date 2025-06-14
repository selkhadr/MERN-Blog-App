const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {User, validateRegisterUser}=require("../models/User");


/**
 * @desc register new user
 * @router /api/auth/regoster
 * @Post
 * @access public
 */
module.exports.registerUserCtrl = asyncHandler(async(req, res)=>{
    const {error} = validateRegisterUser(req.body);
    if (error){
        return res.status(400).json({message: error.details[0].message});
    }
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({message: "user already exist"});
    }
    const salt  = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    })

    await user.save();
    res.status(201).json({message: "you register successfully, please log in"});

})