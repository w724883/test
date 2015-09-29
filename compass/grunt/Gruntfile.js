module.exports = function(grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      compass: {
        dev: {
          options: {
            config: '../config.rb',
            sassDir:'../sass',
            cssDir:'../stylesheets'
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
          files: ['../sass/*.scss','../sass/*.sass'],
          tasks: ['compass'],
          options: {
            livereload: true
          }
        }
      }
    });
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default',['connect','compass','watch']);
}