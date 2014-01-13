var mongo = require('mongodb').MongoClient

function NomNomApi(databaseName, collectionName) {
  var context         = this;
  this.databaseName   = databaseName;
  this.collectionName = collectionName;

  this.findAll = function(callback) {
    mongo.connect(this._databaseName(), function(err, db) {
      if(err) throw err;
      db.collection(context._collectionName()).find().toArray(callback);
    });
  };

  this.insert = function(cats, callback) {
    mongo.connect(this._databaseName(), function(err, db) {
      if(err) throw err;
      db.collection(context._collectionName()).insert(cats, callback); 
    });
  };


  this._collectionName = function() {
    return this.collectionName;
  };

  this._databaseName = function() {
    return "mongodb://127.0.0.1:27017/" + context.databaseName;
  };
};


exports = module.exports = NomNomApi;
