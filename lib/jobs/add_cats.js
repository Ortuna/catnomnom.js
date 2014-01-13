var nomnom = require(process.cwd() + '/lib/nomnomapi');

function AddCats(databaseName, client) {
  var context = this;
  this.client       = client;
  this.databaseName = databaseName;

  this.fetch = function(subreddit, callback) {
    return client.query(subreddit, callback);
  };

  this.addCats = function(collectionName, callback) {
    context.fetch("cats", function(cats) {
      var api = new nomnom(context.databaseName, collectionName); 
      api.insert(cats, function(docs){
        callback();
      });
    });
  };

};


exports = module.exports = AddCats;
