const MongoClient = require('mongodb');
require('dotenv').config();


console.log(process.env.PASSWORD);

function mongoDbConnect(respondentId, college, areaOfStudy, question, res){

  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@"+process.env.MONGOSHIT+".mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err;

    const responseData = {
      "respondentId":respondentId,
      "college":college,
      "areaOfStudy":areaOfStudy,
      "question":question
    }

    var database = client.db("survey");
    var resultsCollection = database.collection("results");

    var studentsEmail = resultsCollection.findOne({"respondentId":respondentId}).then(result => {
      if(result){
        res.send(true);
      } else {
        resultsCollection.insertOne(responseData, (error, result) =>{
          if(error){
            alert("An error has occurred");
          }
        });
        res.send(false);
      }
    });
  });
}


module.exports = mongoDbConnect;
