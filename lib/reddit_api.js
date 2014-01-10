var http = require('request');

function api(baseURL) {
  var context  = this;
  this.baseURL = baseURL;

  this.query = function(subreddit, callback) {
    var fullURL = this.baseURL + '/r/' + subreddit + '.json';
    http.get(fullURL, function(error, response, body) {
      callback( context._parseResponse(body) );	
    });
  };


  this._parseResponse = function(response) {
    var json;
    try { json = JSON.parse(response); } catch(e) { return []; }
    if(typeof json.data === 'undefined')
      return [];

    var children = json.data.children;
    var map      = [];

    for(var i = 0; i < children.length; i ++) {
      map.push(children[0].data);
    }

    return map;
  };

}

exports = module.exports = api;

