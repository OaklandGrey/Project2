import mongoose from "mongoose"
const Country = new mongoose.Schema({
    region : String,
    capital : String,
    language : String
});
