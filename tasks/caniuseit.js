/*
 * grunt-ttcom-xfiles
 *
 *
 * Copyright (c) 2016 Cunningham, Nick
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    grunt.registerMultiTask('caniuseit', 'checks files against caniuse.com database', function() {

        var gruntFs = this;
        var gruntOptions = gruntFs.options();
        
        init();

        function init() {
            grunt.log.writeln(gruntOptions.test)
        }

    });

};
