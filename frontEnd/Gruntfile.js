// Front end grant tasks
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Jshint
		jshint: {
			files: ['Gruntfile.js', 'js/script.js', '!script.min.js'],
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
				src: 'js/script.js',
				dest: 'js/script.min.js'
			}
		},

		// Css minify
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: '/css',
					src: ['*.css', '!*.min.css'],
					dest: '/css',
					ext: '.min.css'
				}]
			}
		},

		// csslint
		csslint: {
			lax: {
				options: {
					import: false,
					'order-alphabetical': false
				},
				src: ['css/*.css', '!*.min.css']
			}
		},

		// sass
		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					// Destination : Source
					'css/style.css' : 'sass/style.scss'
				}
			}
		},

		// html (by Pearly)
		htmlhint: {
		  html1: {
		    options: {
		      'tag-pair': true
		    },
		    src: ['*.html']
		  }
		  // html2: {
		  //   options: {
		  //     'tag-pair': true
		  //   },
		  //   src: ['*.html']
		  // }
		},

		// watch task
		watch : {
			scripts : {
				 files : ['*.html', 'sass/*.scss', 'css/stylesheet.css', 'js/*.js'],
				 tasks : ['htmlhint','sass', 'csslint', 'jshint'],
				options : false,
			},
		}

	}); // end of gruntInit


	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-htmlhint');  //installed by pearly
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Runt grunt task when typing grunt into terminal in public folder
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('minify', ['cssmin','uglify']);

};
