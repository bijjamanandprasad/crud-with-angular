const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    idno: {
        type: String
    },
    year: {
        type: String
    },
    dateOfBirth: {
        type: Date
    },
    branch: {
        type: String
    }
});

const Student = mongoose.model('student_details',StudentSchema);

module.exports = {Student};