module.exports = function ( grunt ) {

  /**
   * Load required Grunt tasks. These are installed based on the versions listed
   * in `package.json` when you do `npm install` in this directory.
   */
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-bump');

  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    build_dir: 'build',
    dist_dir: 'dist',

    files: {
      js: [ 'src/**/*.js' ],
      css: [ 'src/**/*.css' ],
      vendor: []
    },

    /**
     * The banner is the comment that is placed at the top of our compiled
     * source files. It is first processed as a Grunt template, where the `<%=`
     * pairs are evaluated based on this very configuration object.
     */
    meta: {
      banner:
        '/**\n' +
        ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' *\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' */\n'
    },

    bump: {
      options: {
        files: [
          "package.json",
          "bower.json"
        ],
        commit: false,
        commitMessage: 'chore(release): v%VERSION%',
        commitFiles: [
          "package.json",
          "bower.json"
        ],
        createTag: false,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false,
        pushTo: 'origin'
      }
    },

    clean: [ '<%= build_dir %>' ],

    concat: {

      js: {
        options: {
          banner: '<%= meta.banner %>\n' +
            '(function (window, undefined) {\n',
          footer: '})(window);'
        },
        src: [
          '<%= files.vendor %>',
          '<%= files.js %>'
        ],
        dest: '<%= dist_dir %>/<%= pkg.name %>.js'
      },
      css: {
        options: {
          banner: '<%= meta.banner %>\n'
        },
        src: [ '<%= files.css %>' ],
        dest: '<%= dist_dir %>/<%= pkg.name %>.css'
      }
    },

    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      build: {
        files: {
          '<%= dist_dir %>/<%= pkg.name %>.min.js': ['<banner:meta.banner>', '<%= concat.js.dest %>']
        }
      }
    },

    cssmin: {
      options: {
        banner: '<%= meta.banner %>'
      },
      build: {
        files: {
          '<%= dist_dir %>/<%= pkg.name %>.min.css': ['<%= concat.css.dest %>']
        }
      }
    },

    jshint: {
      src: [ '<%= files.js %>' ],
      gruntfile: [ 'Gruntfile.js' ],
      options: {
        curly: true,
        immed: true,
        newcap: true,
        noarg: true,
        sub: true,
        boss: true,
        eqnull: true,
        "-W024": true
      },
      globals: {
        angular: false
      }
    },

    watch: {
      files: [ '<%= files.js %>', '<%= files.css %>' ],
      tasks: ['build']
    }
  });

  grunt.registerTask('default', [ 'build' ]);
  grunt.registerTask('build', [ 'clean', 'jshint', 'concat', 'uglify', 'cssmin']);
};