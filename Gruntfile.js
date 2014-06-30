module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('./package.json'),
        browserify: {
            dist: {
                dest: './dist/datepicker.js',
                src: ['./lib/datepicker.js'],
                options: {
                    bundleOptions: {
                        standalone: 'BootyDatepicker'       // global variable name
                    }
                }
            },
            local: {
                src: './lib/demoLoader.js',
                dest: './public/datepicker.js',
                options: {
                    bundleOptions: {
                        debug: true //sourcemaps
                    }
                }
            },
            prod: {
                src: './lib/demoLoader.js',
                dest: './public/datepicker.js'
            }
        },
        connect: {
            server: {
                options: {
                    port: 8001,
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
                    window: true,
                    document: true
                }
            },
            all: ['index.js', 'Gruntfile.js', 'test/**/*.js', 'lib/**/*.js']
        },
        watch: {
            less: {
                files: './less/**/*.less',
                tasks: ['less']
            },
            app: {
                files: './lib/**/*',
                tasks: ['browserify:local']
            }

        },
        less: {
            development: {
                files: {
                    'public/datepicker.css': 'less/datepicker.less'
                }
            },
            production: {
                options: {
                    compact: true
                },
                files: {
                    './dist/datepicker.min.css': 'less/datepicker.less'
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
                    './dist/datepicker.min.js': ['./dist/datepicker.js']
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
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // run development server for debugging
    grunt.registerTask('default', ['browserify:local', 'less:development', 'connect', 'watch']);

    // run unit tests
    grunt.registerTask('test', ['simplemocha']);

    // run file linter
    grunt.registerTask('lint', ['jshint2']);

    // production build
    grunt.registerTask('production', ['browserify:prod', 'less:development']);
};
