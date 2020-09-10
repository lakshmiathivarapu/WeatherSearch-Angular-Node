const express = require('express')
const bodyParser = require('body-parser');
const request = require('request')
const cors = require('cors');
const app = express();
const port = 8081
const Google_API_Key = "";
const Dark_Sky_API_Key = "";
const custom_search_key = "";
const https = require('https');
let latitude
let longitude
app.use(express.static(path.join(__dirname, 'dist/weather-search-app')));
var path = require('path');
app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}) );

app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

app.get('/weathersearchform',function(req,res) {
  console.log("Response received")
  let googlemaps_response
  let darksky_response
  let street = req.query.street
  let city = req.query.city
  let state = req.query.state
  let add='['+street+','+ city + ',' + state+']';
  console.log(add)
  let url= "https://maps.googleapis.com/maps/api/geocode/json?address="+add+"&key="+Google_API_Key;
  console.log(url)

  request(url, (googlemaps_error, googlemaps_response, googlemaps_body)=> {
  if (!googlemaps_error && googlemaps_response.statusCode === 200) {

    googlemaps_response = JSON.parse(googlemaps_body)
    if(googlemaps_response.status!="OK")
    { res.send({status:"Invalid"})
      return }

    latitude = googlemaps_response.results[0].geometry.location.lat
    longitude = googlemaps_response.results[0].geometry.location.lng
    dark_sky_url= "https://api.darksky.net/forecast/"+Dark_Sky_API_Key+"/"+latitude+","+longitude

    request(dark_sky_url, (error, response, body)=> {
    if (!error && response.statusCode === 200) {
      darksky_response = JSON.parse(body)
      console.log("Got inner response: ", darksky_response)
      res.json(darksky_response)
    } else {
      console.log("Got inner error: ", error, ", status code: ", response.statusCode)
      }
     })
   } else {
    console.log("Got an error: ", error, ", status code: ", response.statusCode)
    }
   })
});


app.get('/currentlocation',function(req,res) {
  console.log("Current Location Response received")
  let darksky_response
  let latitude = req.query.lat
  let longitude = req.query.lon

  dark_sky_url= "https://api.darksky.net/forecast/"+Dark_Sky_API_Key+"/"+latitude+","+longitude

    request(dark_sky_url, (error, response, body)=> {
    if (!error && response.statusCode === 200) {
      darksky_response = JSON.parse(body)
      console.log("Got inner response: ", darksky_response)
      res.json(darksky_response)
     } else {
      console.log("Got inner error: ", error, ", status code: ", response.statusCode)
      }
    })
});

app.get('/displaymodal',function(req,res) {
  console.log("Current Location Response received")
  let darksky_response
  let latitude = req.query.lat
  let longitude = req.query.lon
  let time = req.query.time

  dark_sky_url= "https://api.darksky.net/forecast/"+Dark_Sky_API_Key+"/"+latitude+","+longitude+","+time

    request(dark_sky_url, (error, response, body)=> {
    if (!error && response.statusCode === 200) {
      darksky_response = JSON.parse(body)
      console.log("Got inner response: ", darksky_response)
      res.json(darksky_response)
     } else {
      console.log("Got inner error: ", error, ", status code: ", response.statusCode)
      }
    })
});

app.get('/displayfavourites',function(req,res) {
  console.log("Current Location Response received")
  let darksky_response
  let longitude = req.query.longitude
  let latitude = req.query.latitude

  dark_sky_url= "https://api.darksky.net/forecast/"+Dark_Sky_API_Key+"/"+latitude+","+longitude;

    request(dark_sky_url, (error, response, body)=> {
    if (!error && response.statusCode === 200) {
      darksky_response = JSON.parse(body)
      console.log("Got inner response: ", darksky_response)
      res.json(darksky_response)
     } else {
      console.log("Got inner error: ", error, ", status code: ", response.statusCode)
      }
    })
});

app.get('/displaystatelogo',function(req,res) {
  let state = req.query.state
  console.log(state)

  image_url = "https://www.googleapis.com/customsearch/v1?q="+state+"%20State%20Seal&cx="+custom_search_key +"&imgSize=huge&imgType=news&num=1&searchType=image&key="+Google_API_Key

  console.log(image_url)
    request(image_url, (error, response, body)=> {
    if (!error && response.statusCode === 200) {
      logo_response = JSON.parse(body)
      console.log("state logo: ",logo_response.items[0].link)
      res.json(logo_response.items[0].link);
     } else {
      console.log("Got state: ", error, ", status code: ", response.statusCode)
      }
    })
});


app.get('/autocomplete',function(req,res) {
  console.log("Autocomplete form")
  let term = req.query.term
  console.log(term)

  autocomplete_url= "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+term+"&types=(cities)&language=en&key="+Google_API_Key

  console.log(autocomplete_url)

    request(autocomplete_url, (error, response, body)=> {
    if (!error && response.statusCode === 200) {
      autocomplete_response = JSON.parse(body)
      console.log("Got autocomplete response: ", autocomplete_response)
      res.json(autocomplete_response)
     } else {
      console.log("Got inner error: ", error, ", status code: ", response.statusCode)
      }
    })
});

app.listen(port, function() {
  console.log('Server running on port 3000')
});
