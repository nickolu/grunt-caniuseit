/*
 * grunt-ttcom-xfiles-old
 * 
 *
 * Copyright (c) 2016 Cunningham, Nick
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('ttcom-xfiles-old', 'Investigates dependencies and the supernatural', function() {

        var fs = require('fs'),
            queryString = 'pcc.js',
            filesObject = this.files[0].src,
            allFiles = new Array(),
            fileCount = allFiles.length,
            hbsFiles = [],
            xmlFiles = [],
            matches = [],
            hbsMatches = [],
            xmlMatches = [],
            currentFile,
            i, j;

        createFileArrays();
        searchAllFiles('.hbs');
        //searchXmlFiles();

        function createFileArrays() {
            gruntLog('allfiles is '+typeof allFiles);
            for (i in filesObject) {
                allFiles.push(filesObject[i]);

                if (allFiles[i].indexOf('.hbs') > -1) {
                    hbsFiles.push(allFiles[i]);
                }

                if (allFiles[i].indexOf('.xml') > -1) {
                    xmlFiles.push(allFiles[i]);
                }
            }

            gruntLog('allfiles is '+typeof allFiles);

            gruntLog('xml files: '+xmlFiles.length);
            gruntLog('hbs files: '+hbsFiles.length);
            gruntLog('all files: '+allFiles.length);
        }


        gruntLog(allFiles.length);


        function searchQueryString(query, files, ext) {
            var currentFile = "",
                currentMatches = [];

            if (typeof query != "string") {
                gruntLog('query is not a string');
            }

            if (typeof files != "array") {
                gruntLog('files are messed up for query:'+query);
                gruntLog('files are '+typeof files+' with '+files.length+' length');
                gruntLog('files is '+typeof files[0]);
                currentMatches = false;
                return currentMatches;
            }

            for (i=0; i<files.length; i++) {
                if (files[i].indexOf(ext) > -1) {
                    currentFile = fs.readFileSync(files[i], 'utf8');

                    if (currentFile.indexOf(query) > -1){
                        currentMatches.push(files[i]);
                        gruntLog(query+' found in '+files[i]);
                    }


                }
            }

            return currentMatches;
        }

        function searchAllFiles(filter) {
            var doneChecking = false,
                count = 0,
                currentMatches = [],
                currentQueries = [],
                totalMatches = [],
                i;

            while (!doneChecking) {
                currentMatches = [];
                currentQueries = [];


                if (count === 0) {
                    gruntLog('checking the query string in all files');
                    gruntLog('allFiles is '+typeof allFiles);
                    currentMatches = searchQueryString(queryString,allFiles,'.hbs');
                } else {
                    currentQueries = truncatePaths(matches[matches.length - 1],filter);
                    gruntLog('currentQueries is '+typeof currentQueries);
                    gruntLog('matches is '+typeof matches);
//                    for (i=0; i<currentQueries.length;i++) {
//                        var searchResults = searchQueryString(currentQueries[i],allFiles,'.hbs');
//
//                        if (searchResults) {
//                            totalMatches = currentMatches.concat(currentMatches, searchResults);
//                        }
//                    }
                }
                gruntLog('currentMatches is '+typeof currentMatches);
                hbsMatches.concat(hbsMatches, currentMatches);
                matches.push(currentMatches);
                count++;

                if (currentMatches.length === 0) {
                    doneChecking = true;
                    gruntLog('no more paths to check');
                    gruntLog(matches[0].length);
                }

                if (count > 3) {
                    doneChecking = true;
                    gruntLog('reached search limit');
                }
            }

            gruntLog('done searching for query string');

        }

        function gruntLog(str) {
            grunt.log.writeln(str);
        }

        function truncatePaths(paths,ext) {
            var i, fullPath, currentPaths = paths, truncatedPaths = [];

            for (i=0; i<paths.length; i++) {
                fullPath = currentPaths[i];
                currentPaths[i] = currentPaths[i].split('/');
                currentPaths[i] = '/'+currentPaths[i][currentPaths[i].length - 1].replace(ext,'');
                truncatedPaths.push(currentPaths[i]);
                gruntLog('truncating '+fullPath+' to '+currentPaths[i]);
            }

            return truncatedPaths;
        }

        function searchXmlFiles() {
            var i, j, currentMatches = [], totalMatches = [], truncated;

            gruntLog(matches);
            for (i=0; i<matches[0].length; i++) {
                gruntLog(matches[i]);
                currentMatches = searchQueryString(matches[i],allFiles,'.xml');
                totalMatches = totalMatches.concat(totalMatches,currentMatches);
            }
            gruntLog('finished searching xml files');


        }


        // Iterate over all specified file groups.
//      this.files.forEach(function(f) {
//          // Concat specified files.
//          var count = 0;
//
//          // search files for string
//          f.src.map(function(){
//              count++;
//
//              if (count < 10) {
//                  gruntLog(count +' '+this);
//              }
//
//
//          });
////          var src = f.src.filter(function(filepath) {
////              // Warn on and remove invalid source files (if nonull was set).
////              if (!grunt.file.exists(filepath)) {
////                  grunt.log.warn('Source file "' + filepath + '" not found.');
////                  return false;
////              } else {
////                  return true;
////              }
////          }).map(function(filepath) {
////              // Read file source.
////
////              return grunt.file.read(filepath);
////          }).join(grunt.util.normalizelf(options.separator));
////
////          // Handle options.
////          src += options.punctuation;
//
//          // Write the destination file.
//          //grunt.file.write(f.dest, src);
//
//          // Print a success message.
//          //gruntLog('File "' + f.dest + '" created.');
//      });

    });

};
