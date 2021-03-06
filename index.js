const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
const mongoSubmit = require("./server/mongoSubmit");
const mongoData = require("./server/mongoData");
const mongoDataNoMajor = require("./server/mongoDataNoMajor");
const mongoDelete = require("./server/mongoDelete");

let facebookId;

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, './login.html'));
});

app.post('/setFacebookId', function(req, res){
  facebookId = req.body.facebookId;
});

app.get('/setFacebookId', function(req, res){
  res.send(facebookId);
});

app.post('/submit', function(req, res){
  mongoSubmit(req.body.id, req.body.college, req.body.areaOfStudy, req.body.question, res);
});

app.post('/data', function(req, res){
  mongoData(req.body.college, req.body.areaOfStudy, res);
})

app.post('/dataNoMajor', function(req, res){
  mongoDataNoMajor(req.body.college, res);
})

app.post('/deleteData', function(req, res){
  mongoDelete(facebookId, res);
})

app.listen(process.env.PORT || 3000, () => console.log('Example app listening on port 3000!'));

module.exports = app;
