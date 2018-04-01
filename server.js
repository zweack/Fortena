// App Starting Point : server.js

// Required Packages for Fortena
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

//Initilization of Express Middleware
const app = express()

// OMDB API key
const apiKey = '********';

//Static Folder for Styles
app.use(express.static('public'));

//BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

//View Engine for rendering pages
app.set('view engine', 'ejs')

// Route for homepage
app.get('/', function (req, res) {
  res.render('index', {Movie: null, error: null});
})

app.post('/', function (req, res) {
  let movieName = req.body.movieInput;
  let url = "http://www.omdbapi.com/?i=tt3896198&apikey="+apiKey+"&t=" + movieName + "&y=&plot=full&tomatoes=true&r=json"

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {Movie: null, error: 'Error, please try again'});
    } else {
      let MovieDetails = JSON.parse(body)
      if(MovieDetails.Response==false){
        res.render('index', {Movie: null, error: 'Error, please try again'});
      } else {
        res.render('index', {Movie: MovieDetails, error: null});
      }
    }
  });
})

// Set Port
const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
  console.log(`Server started on ${port}`);
})

module.exports = app;