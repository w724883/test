module.exports = function(grunt){
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
		requirejs:({
			compile: {
				options: {
      					// baseUrl: "../js",
      					mainConfigFile: "main.js",
      					// optimize: 'uglify',
      					// name: "../js/index",
      					// out: "../dist/dist.js" 
      					appDir: "../js",
      					dir: "../dist",
    					optimize: "uglify",
				}
			}
		})
	})
	grunt.loadNpmTasks('grunt-contrib-requirejs');

	grunt.registerTask('default',['requirejs']);
};
