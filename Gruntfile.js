const css = require('css');

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // Builds Sass
    sass: {
      dev: {
        options: {
          implementation: css,
          includePaths: [],
          outputStyle: 'expanded'
        },
        files: [{
          expand: true,
          cwd: 'css/styles',
          src: ['*.scss'],
          dest: 'public/stylesheets/',
          ext: '.css'
        }]
      }
    },

    // Watches assets and sass for changes
    watch: {
      css: {
        files: ['css/styles/**/*.css'],
        tasks: ['css']
      },
      src: {
        files: ['src/gp-lookup/components.jsx'],
        tasks: ['babel', 'clean']
      },
    },

    // nodemon watches for changes and restarts app
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          ext: 'js, json',
          ignore: ['node_modules/**', 'app/assets/**', 'public/**', 'backstop_data/**'],
          args: grunt.option.flags()
        }
      }
    },

    concurrent: {
      target: {
        tasks: ['watch', 'nodemon'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  })

  grunt.registerTask('generate-assets', [
    'sass'
  ])

  grunt.registerTask('default', [
    'concurrent:target'
  ])
}
