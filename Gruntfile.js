/*
 * grunt-caniuseit
 * 
 *
 * Copyright (c) 2016 Cunningham, Nick
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    
    // Configuration to be run (and then tested).
    caniuseit: {
      less: {
        options: {
          test : 'hello world'
        },
        files: {
          'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123']
        }
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['caniuseit']);

};
