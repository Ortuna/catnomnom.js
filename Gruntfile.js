module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-mocha');
	grunt.initConfig({
		"mocha": {
			"test": {
				"src": ['specs/**/*_spec.js'],
			},
	  },
	});
}
