var grunt = require('grunt');

grunt.registerTask('world', 'world task desc', function() {
	console.log('hello world!');
});

grunt.registerTask('hello', 'say hello to someone', function(name) {
	if(!name || !name.length) {
		grunt.warn('You need to provide a name, fool!');
	}
	console.log('hello! ' + name);
});

grunt.registerTask('default', ['world', 'hello:clarence']);

grunt.loadNpmTasks('grunt-contrib-jshint');