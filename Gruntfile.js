module.exports = function (grunt) {
	grunt.initConfig({
		jasmine : {
			src : 'src/console.real.js',
			options: {
				specs : 'specs/console.real.spec.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jasmine');

	// grunt.registerTask('default', 'jasmine');
};
