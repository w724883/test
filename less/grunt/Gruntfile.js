module.exports = function(grunt) {

  // 配置Grunt各种模块的参数
  grunt.initConfig({
    // jshint: { /* jshint的参数 */ },
    // concat: { /* concat的参数 */ },
    // uglify: { /* uglify的参数 */ },
    connect:{
      options:{
        hostname:"192.168.1.100",
        livereload:8080
      }
    },
    watch:{
      less:{
        files:['../less/*'],
        tasks:['less'],
        options:{
          livereload:true
        }
      },
      fresh:{
        files:['../dist/*'],
        options: {
          livereload: true
        }
      }
    },
    less:{
      development: {
        files: {
          "../dist/modules/modules.css":[
            "../less/modules/extend.less",
            "../less/modules/function.less",
            "../less/modules/loop.less",
            "../less/modules/variable.less",
            "../less/modules/mixin.less",
            "../less/modules/namespace.less",
            "../less/modules/nest.less",
            "../less/modules/scope.less",
          ],
          "../dist/index.css":"../less/index.less"
        }
      },
      // production: {
      //   options: {
      //     compress: true
      //   },
      //   files: {
      //     "../test.css": "../test.less"
      //   }
      // }
    }
  });

  // 从node_modules目录加载模块文件
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  // 每行registerTask定义一个任务
  grunt.registerTask('default', ['connect','less','watch']);

};