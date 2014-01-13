var api    = require(process.cwd() + '/lib/nomnomapi')
  , assert = require('assert')
  , nock   = require('nock')
  , mongo  = require('mongodb').MongoClient;

describe("NomNomApi", function() {
  var subject;
  var cats = [
      { name: "example",
        type: "image" },
      { name: "example2",
        type: "image" } ];

  before(function() {
    subject = new api("test", "cats");
  });

  beforeEach(function() {
    mongo.connect("mongodb://127.0.0.1:27017/test", function(err, db) {
      if(err) throw err;
      db.collection('cats').drop();
    });
  });

  it('can insert items into the database', function(done) {
    subject.insert(cats, function() {
      mongo.connect("mongodb://127.0.0.1:27017/test", function(err, db) {
        if(err) throw err;
        var collection = db.collection('cats');
        
        collection.count(function(err, count){
          assert.equal(count, 2);
        });

        collection.find().toArray(function(err, results){
          assert.equal(results[0].type, "image");
          db.close();
          done();
        });
      });
    });
  });

  it('can find all items in the database', function(done) { 
    subject.insert(cats, function() {
      subject.findAll(function(docs) {
        assert.equal(docs[0].type, "image");
        assert.equal(docs.length, 2);
        done();
      });
    });
  });

});
