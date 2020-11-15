const MongoClient = require('mongodb');
require('dotenv').config();


console.log(process.env.PASSWORD);

function mongoDbConnect(respondentId, college, areaOfStudy, question, res){

  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@"+process.env.MONGOSHIT+".mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err;

    const newRespondent = {
      "respondentId":respondentId,
    }

    const responseData = {
      "college":college,
      "areaOfStudy":areaOfStudy,
      "question":question
    }

    var database = client.db("survey");
    var useridCollection = database.collection("userid");
    var resultsCollection = database.collection("results");

    var studentsEmail = useridCollection.findOne({"respondentId":respondentId}).then(result => {
      if(result){
        res.send(true);
      } else {
        useridCollection.insertOne(newRespondent, (error, result) =>{
          if(error){console.log(error);}
        });
        res.send(false);
        resultsCollection.insertOne(responseData, (error, result) =>{
          if(error){console.log(error);}
        });
      }
    });
  });
}


module.exports = mongoDbConnect;
