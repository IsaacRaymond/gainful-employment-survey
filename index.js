const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
const mongoSubmit = require("./server/mongoSubmit");
const mongoData = require("./server/mongoData");

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, './index.html'));
});

app.post('/submit', function(req, res){
  mongoSubmit(req.body.id, req.body.college, req.body.areaOfStudy, req.body.question, res);
});

app.post('/data', function(req, res){
  mongoData(req.body.college, req.body.areaOfStudy, res);
})

app.listen(3000, () => console.log('Example app listening on port 3000!'));

module.exports = app;
