module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        jshint: {
            all: [
                'example/**/*.js',
                'src/*.js'
            ],
            options: {
                jshintrc: '.jshintrc',
                ignores: [
                    'example/js/seajs/*.js',
                    'example/js/vue/*.js',
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
                src: 'example/js/cmp/*.js',
                dest: 'src/cmp.js'
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
                    'example/js/cmp/lucky.js'
                ],
                tasks: ['copy']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['jshint', 'copy', 'express:dev', 'watch']);
};
