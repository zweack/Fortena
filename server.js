const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '5c1518cd';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

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

app.listen(3000, function () {
  console.log('listening on port 3000!')
})
