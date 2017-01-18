module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'js/*.js',
        dest: 'build/js/main.min.js'
      }
    },
    cssmin:{
      build:{
      	src:'css/*.css',
      	dest:'build/css/main.min.css'
      }	
    },
    concat: {
	    dist: {
	      src: ['js/common.js','js/function.js'],
	      dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js',
	    },
	  }

  });

  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['uglify','cssmin','concat']);

};