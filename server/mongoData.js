const MongoClient = require('mongodb');
require('dotenv').config();

function mongoDbConnect(college, areaOfStudy, res){

  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@"+process.env.MONGOSHIT+".mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err;

    const responseData = {
      "college":college,
      "areaOfStudy":areaOfStudy
    }

    console.log(responseData);

    var database = client.db("survey");
    var resultsCollection = database.collection("results");


    resultsCollection.countDocuments(responseData).then(function(result1){
      var count = result1;
      resultsCollection.countDocuments({
        "college": college,
        "areaOfStudy": areaOfStudy,
        "question": "yes"
      }).then(function(result2){
        var yes = result2;
        console.log(count);
        console.log(yes);
        var percentage = (yes/count)*100;
        res.send(percentage.toString()+"%");
      });
    });

  });
}


module.exports = mongoDbConnect;
