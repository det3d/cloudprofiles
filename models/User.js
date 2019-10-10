const mongoose = require('mongoose');

//schema - describe how you data is/looks
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    date: {
        type: Date
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    driverslicense: {
        type: String,
        unique: true,
        required: false
    },
    licenseplate: {
        type: String,
        required: false
    },
    data: [new mongoose.Schema({
        _id: false,
        Name: {
            type: String
        },
        Text: {
            type: String
        }
    }, {
        strict: false
    })]
}, {
    strict: false
});

module.exports = mongoose.model('User', UserSchema);