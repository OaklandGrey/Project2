const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const axios = require('axios')
const mongoose = require('mongoose')
const CountryData = require("./countryData.models")
const CountryDetails = require("./countryDetails.models")
const CountryMetaData = require("./countryMetaData.models")
const CountryRoutes = require("./routes")

const app = express();

app.use('/api', CountryRoutes);
app.listen(6000,function(){
  console.log('We are listening Fam!!');
})
mongoose.connect('mongodb://localhost/project2');


let db = mongoose.connection
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
  console.log("Connection succeeded.");
 });


async function getCountries() {
  try {
    await axios.get('https://restcountries.eu/rest/v2/all')
                .then(res => {
                  // console.log(res.data);
                  for(let i=0; i<res.data.length; i++){
                    let country = new CountryData({
                      fullName : res.data[i].name,
                      code : res.data[i].numericCode
              
                    });
                    country.save(function(error) {
                      console.log("Your Country has been saved");
                      if (error) {
                        console.error(error);
                      }
                    });

                    let countryDetails = new CountryDetails({
                      region : res.data[i].region,
                      capital : res.data[i].capital,
                      area : res.data[i].area,
                      subregion: res.data[i].subregion,
                      population: res.data[i].population
              
                    });
                    countryDetails.save(function(error) {
                      console.log("Your Country has been saved");
                      if (error) {
                        console.error(error);
                      }
                    });

                    let countryMetaData = new CountryMetaData({
                      nativeName : res.data[i].nativeName,
                      altSpellings : res.data[i].altSpellings
                    });
                    countryMetaData.save(function(error) {
                      console.log("Your Country has been saved");
                      if (error) {
                        console.error(error);
                      }
                    });
                    
                  }
                  
                });

  }catch(err){
    console.error(err);

  }

}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

getCountries();