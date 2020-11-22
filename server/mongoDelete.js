const MongoClient = require('mongodb');
require('dotenv').config();

function mongoDbConnect(facebookID, res){

  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@"+process.env.MONGOSHIT+".mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err;

    var database = client.db("survey");
    var resultsCollection = database.collection("results");

    var studentsEmail = resultsCollection.deleteOne({"respondentId":facebookID}).then(result => {
      if(result){
        res.send(true);
      } else{
        res.send(false);
      }
    });
  });
}


module.exports = mongoDbConnect;
