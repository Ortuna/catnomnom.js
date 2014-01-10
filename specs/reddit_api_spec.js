var api    = require('../lib/reddit_api')
	, assert = require('assert')
	, sinon  = require('sinon')
	, nock   = require('nock')
	, fs     = require('fs')
	, xhr, requests;

describe('Reddit API', function() {
	var mockRequest = function(url, return_status, return_value) {
		nock('http://www.reddit.com')
		 .get(url)
		 .reply(return_status, return_value);
	};

	var readFixture = function(path) {
		var cwd = process.cwd();
		return JSON.parse(fs.readFileSync(cwd + "/specs/fixtures/cats.json"));
	};

	it('can query a URL', function(done) {
		mockRequest('/r/cats.json', 200, {data: {children:{}}});
		api.query('http://www.reddit.com/r/cats.json', function(cats) {
			done();
		});
	});

	it('can get JSON data from request', function(done) {
		example_kitties = readFixture('cats.json');

		mockRequest('/r/cats.json', 200, example_kitties);
		api.query('http://www.reddit.com/r/cats.json', function(cats) {
			assert.equal(cats.length, 26);
			assert.equal(cats[0].kind,    "t3");
			assert.equal(cats[0].data.id, "1sk7uv");
			done();
		});
	});


});
