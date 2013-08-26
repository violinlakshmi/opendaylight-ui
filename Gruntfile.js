'use strict';

var LIVERELOAD_PORT = 9001;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

/*global module:false*/
module.exports = function (grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
          '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
          ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        clean: {
            target: 'target'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                //'Gruntfile.js',
                'src/js/{,*/}*.js'
            ],
        },
        // Task configuration.
        bower: {
            install: {
                options: {
                    targetDir: 'target/components',
                    layout: 'byType',
                    install: true,
                    verbose: true,
                    cleanTargetDir: true,
                    cleanBowerDir: false
                }
            }
        },
        // JS Tasks
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['src/js/*.js'],
                dest: 'target/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'target/<%= pkg.name %>.min.js'
            }
        },
        // HTML Tasks
        useminPrepare: {
            html: 'src/index.html',
            options: {
                dest: 'target'
            }
        },
        usemin: {
            html: 'target/index.html'
        },
        htmlmin: {
            build: {
                files: {
                    'target/index.html' : 'src/index.html'
                }
            }
        },
        // Style tasks
        cssmin: {
            combine: {
                files: {
                    'target/<%= pkg.name %>-combined.css': ['src/css/*.css']
                }
            }
        },
        less: {
            dev: {
                options: {
                    paths: ['src/less']
                },
                files: {
                    'target/<%= pkg.name %>.css': 'src/css/<%= pkg.name %>.less'
                }
            }
        },
        copy: {
            prod: {
                files: [
                    {expand: true, cwd:'src', src: ['partials/*.html'], dest: 'target'},
                    {expand: true, cwd:'src/components/bootstrap', src: ['img/*'], dest: 'target'},
                    // Copy images (Logo etc)
                    {expand: true, cwd:'src/img', src: ['*.*'], dest: 'target/img'}
                ]
            }
        },
        connect: {
            livereload: {
                options: {
                    port: 9000,
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, 'target'),
                            lrSnippet
                        ]
                    }
                }
            },
            dev: {
                options: {
                    port: 9000,
                    base: 'target'
                }
            },
            prod: {
                options: {
                    port: 9001,
                    base: 'target',
                    keepalive: true
                }
            }
        },
        open: {
            dev: {
                path: 'http://127.0.0.1:9000/'
            },
            prod: {
                path: 'http://127.0.0.1:9001/'
            }
        },

        watch: {
            dev: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                        'src/*.html',
                        'src/partials/*.html'
                ],
                tasks: ['build-target']
            },
            js: {
                files: 'src/*.js',
                tasks: ['build-js'],
                options: {
                    debounceDelay: 100,
                    livereload: LIVERELOAD_PORT
                },
            },
            styles: {
                files: ['src/css/*.*'],
                tasks: ['build-styles'],
                options: {
                    livereload: LIVERELOAD_PORT
                }
            }
        },
    });

    grunt.registerTask('build-js', ['jshint', 'concat']);
    grunt.registerTask('build-styles', ['cssmin', 'less']);

    grunt.registerTask('build-target', ['useminPrepare', 'build-js', 'uglify', 'build-styles', 'htmlmin', 'usemin', 'copy:prod']);

    grunt.registerTask('default', ['clean', 'bower:install', 'build-target']);

    grunt.registerTask('dev', ['build-target', 'connect:dev', 'open:dev', 'watch']);
    grunt.registerTask('live', ['build-target', 'connect:livereload', 'open:dev', 'watch']);
    grunt.registerTask('prod', ['build-target', 'open:prod', 'connect:prod']);

};
