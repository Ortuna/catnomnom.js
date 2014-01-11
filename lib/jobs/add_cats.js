var mongo     = require('mongodb').MongoClient
function AddCats(databaseName, client) {
  var context = this;
  this.client       = client;
  this.databaseName = databaseName;

  this.fetch = function(subreddit, callback) {
    return client.query(subreddit, callback);
  };

  this.addCats = function(collectionName, callback) {
    mongo.connect("mongodb://127.0.0.1:27017/" + this.databaseName, function(err, db) {
      if(err) throw err;

      var collection = db.collection(collectionName);
      context.fetch("cats", function(cats) {
        collection.insert(cats, function(err, docs) {
          db.close();
          callback();
        });
      });
    });
  };

};


exports = module.exports = AddCats;
