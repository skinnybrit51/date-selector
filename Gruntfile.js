var browserifyHandlebars = require('browserify-handlebars');

module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg : grunt.file.readJSON('./package.json'),
        connect : {
            server : {
                options : {
                    port : 8001,
                    base : 'playground'
                }
            }
        },
        watch : {
            less : {
                files : './less/**/*.less',
                tasks : ['less']
            },
            app : {
                files : './lib/**/*',
                tasks : ['browserify:playground']
            }

        },
        browserify : {
            dist : {
                dest : './dist/dateSelector.min.js',
                src : ['./lib/datepicker.js'],
                options : {
                    transform : [browserifyHandlebars],
                    bundleOptions : {
                        standalone : 'DateSelector'       // global variable name
                    }
                }
            },
            playground : {
                src : './lib/datepicker.js',
                dest : './playground/dateSelector.min.js',
                options : {
                    transform : [browserifyHandlebars],
                    bundleOptions : {
                        standalone : 'DateSelector',       // global variable name
                        debug : true //sourcemaps
                    }
                }
            }
        },
        uglify : {
            dist : {
                files : {
                    './dist/dateSelector.min.js' : ['./dist/dateSelector.min.js']
                }
            }
        },
        less : {
            dist : {
                options : {
                    compact : true
                },
                files : {
                    './dist/dateSelector.min.css' : './less/dateSelector.less'
                }
            }
        },
        cssmin : {
            dist : {
                options : {
                    banner : '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */'
                },
                files : {
                    './dist/dateSelector.min.css' : './dist/dateSelector.min.css'
                }
            }
        },
        copy : {
            playground : {
                files : [
                    {
                        expand : true,
                        src : './fonts/*',
                        dest : './playground'
                    },
                    {
                        expand : true,
                        flatten : true,
                        src : './dist/*',
                        dest : './playground',
                        filter : 'isFile'
                    }
                ]
            }
        },
        usebanner : {
            dist : {
                options : {
                    position : 'top',
                    banner : '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */',
                    linebreak : true
                },
                files : {
                    src : [
                        './dist/dateSelector.min.js',
                        './dist/dateSelector.min.css'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-banner');

    // run development server for debugging
    grunt.registerTask('default', [
        'copy',
        'browserify:playground',
        'less:dist',
        'cssmin:dist',
        'usebanner:dist',
        'copy:playground',
        'connect',
        'watch'
    ]);

    // production build
    grunt.registerTask('dist', [
        'browserify:dist',
        'uglify:dist',
        'less:dist',
        'cssmin:dist',
        'usebanner:dist'
    ]);
};
