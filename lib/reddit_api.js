var rest = require('restler');

var _parseResponse = function(response) {
	return response.data.children;
};

exports.query = function(url, callback) {
	rest.get(url).on('complete', function(response) {
		callback( _parseResponse(response) );	
	});
};


