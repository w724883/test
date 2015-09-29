module.exports = function(grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      sass: {
          dist: {
            options: {
              style: 'expanded'
            },
            files: {
                '../testscss.css' : '../test.scss',
                '../testsass.css' : '../test.sass'
            }
          }
      },
      connect: {
        options: {
            // port: 8000,
            // protocol: 'http',
            hostname: "10.33.44.88",
            // hostname: "127.0.0.1",
            // base: ".",
            // open: false,
            livereload: 8080
        }
      },
      watch: {
        css: {
          files: ['../*.scss','../*.sass'],
          tasks: ['sass'],
          options: {
            livereload: true
          }
        },
        fresh:{
          files:['../*.css'],
          options: {
            livereload: true
          }
        }
      }
    });
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default',['connect','sass','watch']);
}