const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Student } = require('../models/student');

router.get('/students', (req, res) => {
    Student.find({})
    .then((data) => res.send(data))
    .catch((error) => console.log(error));
});

router.post('/',(req,res) => {
    (new Student({
        'name': req.body.name,
        'idno': req.body.idno,
        'year': req.body.year,
        'dateOfBirth': req.body.dateOfBirth,
        'branch': req.body.branch
    }))
    .save()
    .then((data) => res.send(data))
    .catch((error) => console.log(error + "eeeeee"));
});

router.put('/group/:id',(req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    Student.findByIdAndUpdate({_id:req.params.id},{$addToSet: { group: { $each: ["jkiuyh","qwerty"]} } })
    .then((data) => res.send(data))
    .catch((error) => console.log(error));
});

router.get('/students/:studentId',(req, res) => {
    if(!ObjectId.isValid(req.params.studentId))
        return res.status(400).send(`No record with given id: ${req.params.studentId}`);
    Student.findById(req.params.studentId)
    .then((data) => res.send(data))
    .catch((error) => console.log(error));
});

router.patch('/students/:id',(req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id ${req.params.id} to update`);
    Student.findByIdAndUpdate(req.params.id,{ $set: req.body },{new: true})
    .then((data) => res.send(data))
    .catch((error) => console.log(error));
});

router.delete('/students/:id',(req,res) => {
    if(!ObjectId.isValid({_id:req.params.id})){
        return res.status(400).send(`deletion failed for id ${req.params.id}`);
    }
    Student.findByIdAndDelete(req.params.id)
    .then((data) => res.send(data))
    .catch((error) => console.log(error + "while deleting row"));
});





module.exports = router;