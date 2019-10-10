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
        type: String
    },
    password: {
        type: String
    },
    avatar: {
        type: String
    },
    driverslicense: {
        type: String
    },
    licenseplate: {
        type: String
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