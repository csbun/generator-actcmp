module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        // 将bower依赖的文件复制到项目中
        'bower-install-simple': {
            options: {},
            prod: {
                options: {
                    production: true
                }
            }
        },
        bower: {
            cmp: {
                dest: 'example/js/cmp/'
            }
        },
        clean: ['bower_components'],

        jshint: {
            all: [
                'example/**/*.js',
                'src/*.js'
            ],
            options: {
                jshintrc: '.jshintrc',
                ignores: [
                    'example/js/seajs/*.js',
                    'example/js/cmp/vue.js',
                    'example/js/core/*.js'
                ],
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
        // 在 example 中改，自动复制到 src 中去
        copy: {
            main: {
                src: 'example/js/cmp/<%= _.slugify(cmpName) %>.js',
                dest: 'src/<%= _.slugify(cmpName) %>.js'
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
                    'example/**/*',
                ],
                options: {
                    livereload: true
                }
            },
            copy: {
                files: [
                    'example/js/cmp/<%= _.slugify(cmpName) %>.js'
                ],
                tasks: ['copy']
            }
        }
    });
    // TODO: try grunt-conventional-changelog

    grunt.loadNpmTasks('grunt-bower-install-simple');
    grunt.loadNpmTasks('grunt-bower');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-express-server');

    grunt.registerTask('install', ['bower-install-simple', 'bower', 'clean']);
    grunt.registerTask('default', ['copy', 'jshint', 'express:dev', 'watch']);
};
