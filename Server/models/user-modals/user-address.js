const mongoose = require('mongoose')

const UserAddressSchema = new mongoose.Schema(
    {	
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        door_no:{
            type : String,
        },
        street:{
            type : String,
        },
        village:{
            type : String,
        },
        district:{
            type : String,
        },
        state:{
            type : String,
        }
   
    }
    );

const UserAddress = mongoose.model('UserAddress',UserAddressSchema);
module.exports = {UserAddress};
