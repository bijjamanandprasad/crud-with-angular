const express = require('express');
const { models } = require('../db');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { User } = require('../models/user-modals/user');
var { UserAddress } = require('../models/user-modals/user-address');






router.post('/',(req,res) => {
    let userId;
    (new User({
        'name':req.body.name,
        'mobile_num':req.body.mobile_num,
        'email':req.body.email
    }))
    .save()
    .then((data)=>{
        userId = data._id;
        (new UserAddress({
            'user':data._id,
            'door_no':req.body.address.door_no,
            'street':req.body.address.street,
            'village':req.body.address.village
        }))
        .save()
        .then((data)=>{
            console.log(data+"ddddd");
           return models.User.findOneAndUpdate({_id:userId},{$addToSet:{address: data._id}});
        })
        .then((data)=>{
            return models.User.findOne({_id:userId}).populate({path:'address'});
        })
        .then((data)=>{
            res.send(data);
        })
    })
    .catch((error)=>console.log(error + 'error while inserting user details'));

});




module.exports = router;