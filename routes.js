const CountryData = require("./countryData.models")
const CountryDetails = require("./countryDetails.models")
const CountryMetaData = require("./countryMetaData.models")

let express = require('express');
let router = express.Router();

router.get('/', (req, res, next)=>{
    console.log("We are here!!");
    //let name = req.params.name;
    CountryData.find({
        fullName: "Australia"
    }).then((country)=>{
        res.json(country);
    });
    // return country;

});

router.post('/', (req, res, next)=>{
    console.log("We are here!!");
    //let name = req.params.name;
    let country = new CountryData({
        fullName : "Columbia",
        code : "234"

      });
      country.save(function(error) {
        console.log("Your Country has been saved");
        if (error) {
          console.error(error);
        }
      });
});

router.put('/', (req, res, next)=>{
    console.log("We are here!!");
    //let name = req.params.name;
    CountryData.update({
        fullName: "Australia"
    },{
        $set:{
            fullName: "The land down under"
        }
    }).then((country)=>{
        res.json(country);
    });
    // return country;

});

router.delete('/', (req, res, next)=>{
    console.log("We are here!!");
    //let name = req.params.name;
    CountryData.remove({
        fullName: "Columbia"
    }).then((country)=>{
        res.json(country);
    });
    // return country;

});




module.exports = router;