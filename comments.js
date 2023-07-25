// Create web server

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

var COMMENTS_FILE = 'comments.json';

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname + '/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Enable CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// GET /api/comments
app.get('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

// POST /api/comments
app.post('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    var comments = JSON.parse(data);

    var newComment = {
      id: Date.now(),
