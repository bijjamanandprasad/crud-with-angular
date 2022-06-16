const express = require('express');
const app = express();

const cors = require('cors');

const {mongoose} = require('./db.js');

const studentController = require('./controllers/studentController.js');

const userController = require('./controllers/userController.js');


app.use(cors());
app.use(express.json());
app.use('/',studentController);
app.use('/user/',userController);

app.listen(3000,()=>{
    console.log("Server is running on PORT:3000");
});
