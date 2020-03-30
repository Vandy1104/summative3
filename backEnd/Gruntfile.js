// Back end grunt tasks
module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Js hint
		jshint: {
			files: ['Gruntfile.js', 'index.js', '!index.min.js'],
			options: {
			// options here to override JSHint defaults
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				},
				laxcomma: true,
				esversion : 6
			}
		},

		// Uglify
		uglify: {
			build: {
				src: 'index.js',
				dest: 'index.min.js'
			}
		},

		// watch task
		watch : {
			scripts : {
				files : ['index.js' , 'Gruntfile.js'],
				tasks : ['jshint'],
				options : false,
			},
		}
	});



	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// Run grunt task when typing grunt into terminal in frontEnd folder
	grunt.registerTask('default', ['watch']);
};
