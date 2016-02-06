module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: [
                'index.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        express: {
            options: {
                port: 4000
            },
            dev: {
                options: {
                    script: 'server/app.js'
                }
            }
        },
        watch: {
            express: {
                files: [
                    'server/*.js'
                ],
                tasks: ['express:dev'],
                options: {
                    spawn: false
                }
            },
            example: {
                files: [
                    'index.js',
                    'example/**/*',
                ],
                options: {
                    livereload: true
                }
            }
        }
    });
    // TODO: try grunt-conventional-changelog
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');

    grunt.registerTask('default', ['jshint', 'express:dev', 'watch']);
};
