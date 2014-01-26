module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON( 'package.json' ),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> (https://github.com/janhancic/console.real) */\n'
			},
			build: {
				src: 'src/console.real.js',
				dest: 'build/console.real.min.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify' );

	grunt.registerTask( 'default', ['uglify'] );
};
