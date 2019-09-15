const mongoose = require('mongoose')
const CountryDetails = new mongoose.Schema({
    region : String,
    capital : String,
    area : Number,
    subregion: String,
    population: Number
});

module.exports = mongoose.model('CountryDetails', CountryDetails);