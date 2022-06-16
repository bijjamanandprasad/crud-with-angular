const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/room_management')
    .then(() => console.log("Database is Connected!"))
    .catch((error) => console.log(error));

module.exports = mongoose;