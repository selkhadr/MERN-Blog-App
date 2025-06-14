const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minlength: 8,
    },
    profilePhoto: {
        type: Object,
        default:{
            url: "https://cdn.pixabay.com/photo/2014/03/24/13/49/avatar-294480_640.png",
            publicId: null,
        }
    },
    bio: String,
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isAccountVerified: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true,});

const User = mongoose.model("User", UserSchema);

module.exports={User}
