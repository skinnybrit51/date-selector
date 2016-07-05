var browserifyHandlebars = require('browserify-handlebars');

module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg : grunt.file.readJSON('./package.json'),
        connect : {
            demos : {
                options : {
                    port : 8001,
                    base : 'demos'
                }
            },
            playground : {
                options : {
                    port : 8002,
                    base : 'playground'
                }
            }
        },
        watch : {
            less : {
                files : './assets/less/**/*.less',
                tasks : ['less']
            },
            demos : {
                files : ['./assets/demos/**/*'],
                tasks : ['browserify:demos']
            },
            playground : {
                files : ['./assets/lib/**/*'],
                tasks : ['browserify:playground']
            }

        },
        browserify : {
            dist : {
                src : ['./assets/lib/datepicker.js'],
                dest : './dist/dateSelector.min.js',
                options : {
                    transform : [browserifyHandlebars],
                    bundleOptions : {
                        standalone : 'DateSelector'       // global variable name
                    }
                }
            },
            demos : {
                src : './assets/demos/demoBootstrap.js',
                dest : './demos/demoBootstrap.js',
                options : {
                    transform : [browserifyHandlebars],
                    bundleOptions : {
                        debug : true //sourcemaps
                    }
                }
            },
            playground : {
                src : ['./assets/lib/playgroundBootstrap.js'],
                dest : './playground/playground.js',
                options : {
                    transform : [browserifyHandlebars],
                    bundleOptions : {
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
                        src : './dist/*.css',
                        dest : './playground',
                        filter : 'isFile'
                    }
                ]
            },
            demos : {
                files : [
                    {
                        expand : true,
                        src : './fonts/*',
                        dest : './demos'
                    },
                    {
                        expand : true,
                        flatten : true,
                        src : './dist/*',
                        dest : './demos',
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

    // playground
    grunt.registerTask('playground', [
        'copy',
        'browserify:playground',
        'less:dist',
        'copy:playground',
        'connect:playground',
        'watch'
    ]);

    // demos
    grunt.registerTask('demos', [
        'copy',
        'browserify:dist',
        'browserify:demos',
        'less:dist',
        'cssmin:dist',
        'usebanner:dist',
        'copy:playground',
        'connect:demos',
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
