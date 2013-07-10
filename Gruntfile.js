'use strict';

module.exports = function(grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today(\'yyyy-mm-dd\') %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    nodeunit: {
      all: ['test/**/*.js']
    },
    watch: {
      test: {
        files: [
          'src/**/*.js',
          'test/**/*.js'
        ],
        tasks: ['nodeunit']
      },
      jshint: {
        files: '<%= jshint.all %>',
        tasks: ['jshint']
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'nodeunit']);

  grunt.registerTask('release', ['jshint', 'nodeunit', 'minwithcomments', 'concatlang', 'minlang']);
};
