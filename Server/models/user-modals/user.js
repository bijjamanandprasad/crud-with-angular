const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        mobile_num: {
            type: Number,
            required: true,
            // unique: true
        },
        name: {
            type: String,
            trim: true                         
        },
        email:{
            type: String
        },
        address:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref: "UserAddress"
            }
        ],
        // room_details:[
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref:"roomDetails"
        //     }
        // ]
    },
    );

const User = mongoose.model('User',UserSchema);
module.exports = {User};
