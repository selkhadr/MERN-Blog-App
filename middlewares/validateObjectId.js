const mongoose = require("mongoose");

module.exports = (req, res, next)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(403).json({message: "invalid id"});
    }
    next();
}