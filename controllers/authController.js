const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {User, validateRegisterUser, validateLoginUser}=require("../models/User");


/**
 * @desc register new user
 * @route /api/auth/regoster
 * @method Post
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


/**
 * @desc login user
 * @route /api/auth/login
 * @method Post
 * @access public
 */
module.exports.loginUserCtrl = asyncHandler(async(req, res)=>{
    const {error} = validateLoginUser(req.body);
    if (error){
        return res.status(400).json({message: error.details[0].message});
    }

    const user = await User.findOne({email: req.body.email});
    if(!user)
    {
        return res.status(400).json({message: "invalid email pr password"});
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    if(!isPasswordMatch)
    {
        return res.status(400).json({message: "invalid email pr password"});
    }

    const token = user.generateAuToken();

    res.status(200).json({
        _id: user._id,
        isAdmin: user.isAdmin,
        profilePhoto: user.profilePhoto,
        token,
    })
})