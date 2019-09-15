const mongoose = require('mongoose')

const Country = new mongoose.Schema({
    fullName : String,
    code : String
});

module.exports = mongoose.model('Country', Country);



