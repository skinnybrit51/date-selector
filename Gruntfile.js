module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('./package.json'),
        watchify: {
            dist: {
                src: './lib/app.js',
                dest: './public/app.js'
            }
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: 'public'
                }
            }
        },
        simplemocha: {
            options: {
                timeout: 2000,
                ui: 'bdd',
                reporter: 'spec'
            },
            all: {
                src: ['test/**/*.js']
            }
        },
        jshint2: {
            options: {
                jshintrc: '.jshintrc',
                force: false,
                cache: true,
                reporter: 'default',
                globals: {
                    module: true,
                    require: true,
                    it: true,
                    describe: true,
                    beforeEach: true,
                    afterEach: true,
                    global: true,
                    window: true
                }
            },
            all: ['index.js', 'Gruntfile.js', 'test/**/*.js', 'lib/**/*.js']
        },
        watch: {
            files: './style/**/*.less',
            tasks: ['less']
        },
        less: {
            development: {
                files: {
                    'public/app.css': 'style/app.less'
                }
            },
            production: {
                options: {
                    compact: true
                },
                files: {
                    './dist/app.min.css': 'style/app.less'
                }
            }
        },
        browserify: {
            dist: {
                dest: './dist/app.js',
                src: ['./lib/app.js'],
                options: {
                    bundleOptions: {
                        standalone: 'App'       // global variable name
                    }
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            production: {
                files: {
                    './dist/app.min.js': ['./dist/app.js']
                }
            }
        },
        clean: {
            js: ['./dist/*.js', '!./dist/*.min.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-jshint2');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-watchify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // run development server for debugging
    grunt.registerTask('default', ['watchify', 'less:development', 'connect', 'watch']);

    // run unit tests
    grunt.registerTask('test', ['simplemocha']);

    // run file linter
    grunt.registerTask('lint', ['jshint2']);

    // production build
    grunt.registerTask('production', ['browserify', 'uglify:production',
        'less:production', 'clean']);
};
