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
    mochaTest: {
      options: {
        reporter: 'spec'
      },
      unit: {
        src: ['test/**/*.js']
      }
    },
    watch: {
      files: [
        'Gruntfile.js',
        'src/**/*.js',
        'test/**/*.js'
      ],
      tasks: ['jshint', 'mochaTest'],
      options: {
        atBegin: true
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['watch']);

  grunt.registerTask('release', ['jshint', 'mochaTest', 'uglify']);
};
