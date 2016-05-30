module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: {
                    'build/stylesheets/main.css': 'src/app/stylesheets/main.scss'
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    keepalive: true
                }
            }
        },
        browserify: {
            options: {
                transform: [ 'babelify', 'reactify' ]
            },
            app: {
                src: 'src/index.js',
                dest: 'build/app.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Default task
    grunt.registerTask('default', [
        'sass',
        'browserify',
        'connect'
    ]);

};
