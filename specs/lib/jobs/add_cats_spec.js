var AddCats = require(process.cwd() + '/lib/jobs/add_cats')
, api       = require(process.cwd() + '/lib/reddit_api')
, assert    = require('assert')
, sinon     = require('sinon')
, nock      = require('nock')
, mongo     = require('mongodb').MongoClient

describe('AddCats', function(){
  var subject, client, sandbox; 

  var stubClientQuery = function(client, values) {
    return sandbox.stub(client, "query", function(s, cb) {
      cb(values);
    });
  };

  beforeEach(function() {
    client  = new api("http://www.reddit.com");
    subject = new AddCats("test", client);
    sandbox = sinon.sandbox.create();
  });

  afterEach(function() {
    sandbox.restore(); 
  });


  it('Can fetch some cats', function(done) {
    stubClientQuery(client, [{}, {}]); 

    subject.fetch('kittens', function(kittens) {
      assert.equal(kittens.length, 2);
      done();  
    });

  });

  describe('Mongo', function() {
    beforeEach(function() {
      mongo.connect("mongodb://127.0.0.1:27017/test", function(err, db) {
        if(err) throw err;
        var collection = db.collection('cats');
        collection.drop();
      });
    });

    it('Adds the cats to the database', function(done) {
      var cats = [{ id: "xyz",
                    sub: "test",
                    url: "http://www.google.com" },
                  { id: "abc",
                    sub: "test",
                    url: "http://www.yahoo.com" }];

      stubClientQuery(client, cats); 

      subject.addCats('cats', function() {
        mongo.connect("mongodb://127.0.0.1:27017/test", function(err, db) {
          if(err) throw err;

          var collection = db.collection('cats');

          collection.find().toArray(function(err, results){
            assert.equal(results[0].sub, "test");
            assert.equal(results.length, 2);
            db.close();
            done();
          });
        });
      });
    });
  });
});
