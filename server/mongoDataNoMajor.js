const MongoClient = require('mongodb');
require('dotenv').config();

function mongoDbConnect(college, res){

  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@"+process.env.MONGOSHIT+".mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err;

    const responseData = {
      "college":college
    }

    var database = client.db("survey");
    var resultsCollection = database.collection("results");

    resultsCollection.countDocuments(responseData).then(function(result1){
      var count = result1;
      resultsCollection.countDocuments({
        "college": college,
        "question": "yes"
      }).then(function(result2){
        var yes = result2;
        var percentage = (yes/count)*100;
        var dataStuff = {
          yes: result2,
          total: count
        }
        res.send(dataStuff);
      });
    });

  });
}


module.exports = mongoDbConnect;
