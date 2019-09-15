const mongoose = require('mongoose')
const CountryMetaData = new mongoose.Schema({
    nativeName : String,
    altSpellings : [String]
});

module.exports = mongoose.model('CountryMetaData', CountryMetaData);