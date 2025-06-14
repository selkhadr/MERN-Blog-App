const asyncHandler = require("express-async-handler");
const {User} = require("../models/User");
const { response } = require("express");

/**
 * @desc get all users
 * @route /apgetst
 * @access private (only admin)
 */

module.exports.getAllUsersCtrl = asyncHandler(async(req, res)=>{
    const users = await User.find();
    res.status(200).json(users);
})

