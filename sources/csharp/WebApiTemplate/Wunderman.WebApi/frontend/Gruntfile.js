module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var PATH = {
        dist: {
            root: './dist',
            js: '<%= PATH.dist.root %>/app/assets/js/**.js',
            img: '<%= PATH.dist.root %>/app/assets/img',
            files: '<%= PATH.dist.js %>/application.js'
        },
        app: {
            root: './app',
            css: '<%= PATH.app.root %>/assets/css',
            js: '<%= PATH.app.root %>/assets/js',
            img: '<%= PATH.app.root %>/assets/img',
            source: {
                js: '<%= PATH.app.root %>/source/js',
                libs: '<%= PATH.app.source.js %>/libs',
                sass: '<%= PATH.app.root %>/source/sass'
            },
            files: {
                js: {
                    '<%= PATH.app.js %>/application.js': [
                        '<%= PATH.app.source.js %>/application/**/*.js'
                    ],
                    '<%= PATH.app.js %>/libs/angular.js': [
                      '<%= PATH.app.source.libs %>/angular/angular.min.js',
                      '<%= PATH.app.source.libs %>/angular/angular-resource.min.js',
                      '<%= PATH.app.source.libs %>/angular/angular-route.min.js',
                      '<%= PATH.app.source.libs %>/angular/angular-cookies.min.js'
                    ],
                    '<%= PATH.app.js %>/libs/plugins.js': [
                        '<%= PATH.app.source.libs %>/[^angular]*/*.js'
                    ]
                }
            }
        }
    };

    grunt.initConfig({

        PATH: PATH,

        compass: {
            dist: {
                options: {
                    config: 'config.rb'
                }
            }
        },

        uglify: {
            my_target: {
                files: '<%= PATH.dist.files.js %>'
            }
        },

        concat: {
            application_and_libs: {
                files: '<%= PATH.app.files.js %>'
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeComments: true
                },

                files: [{
                    expand: true,
                    cwd: '<%= PATH.dist.root %>',
                    src: '{,*/}*.html',
                    dest: '<%= PATH.dist.root %>'
                }]
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: '<%= PATH.dist.img %>',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= PATH.dist.img %>'
                }]
            }
        },

        concurrent: {
            dev: ['compass', 'concat'],
            run: ['uglify', 'imagemin']
        },

        connect: {
            options: {
                port: 3000,
                open: true,
                livereload: 35729,
                hostname: 'localhost',
                base: '<%= PATH.app.root %>'
            },

            livereload: {
                options: {
                    middleware: function( connect ) {
                        return [
                            connect.static(PATH.app.root),
                            connect.static(PATH.app.css),
                            connect.static(PATH.app.js),
                            connect.static(PATH.app.img)
                        ];
                    }
                }
            }
        },

        watch: {
            css: {
                files: '<%= PATH.app.source.sass %>/**/*.scss',
                tasks: ['compass']
            },

            gruntfile: {
                files: ['Gruntfile.js']
            },

            scripts: {
                files: '<%= PATH.app.source.js %>/**/*.js',
                tasks: ['concat']
            },

            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },

                files: [
                    '<%= PATH.app.root %>/{,*/}*.html',
                    '<%= PATH.app.css %>/{,*/}*.css',
                    '<%= PATH.app.js %>/{,*/}*.js',
                    '<%= PATH.app.img %>/{,*/}*'
                ]
            }
        },

        open: {
            dev: {
                path: 'http://localhost:3000',
                app: 'Chrome'
            }
        },

        copy: {
            dist: {
                expand: true,
                src: '<%= PATH.app.root %>/**',
                dest: '<%= PATH.dist.root %>'
            }
        },

        clean: {
            dist: ['<%= PATH.dist.img %>/tmp/', '<%= PATH.dist.root %>/app/source/']
        }

    });

    grunt.registerTask('default', ['concurrent:dev', 'connect:livereload', 'open:dev', 'watch']);
    grunt.registerTask('run', ['compass', 'copy', 'concurrent:run', 'clean']);

};