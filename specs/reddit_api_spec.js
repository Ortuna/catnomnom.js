var api    = require('../lib/reddit_api')
, assert = require('assert')
, sinon  = require('sinon')
, nock   = require('nock')
, fs     = require('fs')
, xhr, requests;

//Fixtures
var setupFixtures = function() {
  nock('http://www.reddit.com')
    .get('/r/cats_from_file.json')
    .replyWithFile(200, process.cwd() + "/specs/fixtures/cats.json");

  nock('http://www.reddit.com')
    .get('/r/cats_empty.json')
    .reply(200,{data: {children: { data: {}}}});

  nock('http://www.reddit.com')
    .get('/r/cats_invalid.json')
    .reply(200, "Some invalid string");
};

describe('Reddit API', function() {
  setupFixtures();

  var client;
  before(function(){
    client = new api('http://www.reddit.com');
  });

  it('can query a URL', function(done) {
    client.query('cats_empty', function(cats) {
      done();
    });
  });

  it('can get JSON data from request', function(done) {
    client.query('cats_from_file', function(cats) {
      assert.equal(cats.length, 26);
      assert.equal(cats[0].id,  "1sk7uv");
      done();
    });
  });

  it('returns an empty array when there is a bad response', function(done) {
    client.query('cats_invalid', function(cats) {
      assert.equal(cats.length, 0);
      done();
    });
  });

});

