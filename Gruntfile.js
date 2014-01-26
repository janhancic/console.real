module.exports = function (grunt) {
	grunt.initConfig({
		jasmine : {
			src : 'src/console.real.js',
			options: {
				specs : 'specs/console.real.spec.js'
			}
		},
		watch: {
			files: ['src/console.real.js', 'specs/console.real.spec.js'],
			tasks: 'jasmine'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-watch');
};
