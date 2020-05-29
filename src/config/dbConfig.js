import MongoClient from 'mongodb';

const dbConnectionUrl = "mongodb+srv://trongtung:tandt123@ggh-yglwk.mongodb.net/test?retryWrites=true&w=majority";

function innitialize( 
  dbName,
  dbCollectionName,
  successCallback,
  failureCallback
)
{
  MongoClient.connect(dbConnectionUrl,function (err, dbInstance) {
    if (err) {
      console.log(err)
      failureCallback(err)
    } else {
      let dbOject = dbInstance.db(dbName);
      let dbCollection = dbOject.collection(dbCollectionName);
      console.log("success")
      successCallback(dbCollection)
    }
  });
}

module.exports = {
  innitialize: innitialize
}