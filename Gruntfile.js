module.exports = function (grunt) {
	grunt.initConfig({
        //Observar cambios
        watch: {
            options: {
                nospawn: false,
                livereload: true
            },
            //observar de stylus
            stylesheets: {
                files: ['stylus/*.styl'],
                tasks: ['stylus']
            },
            //observar de js
            scripts: {
                files: ['javascript/*.js'],
                tasks: ['uglify']
            },
            //observar el jade
            jadephp: {
                files: ["jade/*.jade"],
                tasks: ["jadephp"]
            }
        },
		//Preprocesador css
        stylus: {
            compile: {
                options: {
                    compress: true,
                    linenos: false
                },
                files: [{
                    //sitio
                    'css/estilos.css': 'stylus/estilos.styl',
                }]
            }
        },
		// Compresor de .js
	    uglify: {
			options: {
				mangle: false,
				compress: {
					drop_console: true
				}
			},
			js: {
				files: {
					'js/main.min.js': 'javascript/*.js',
				}
			}
	    },
	    // Compilar Jade
		jadephp: {
            compile: {
                options: {
                    client: false,
                    pretty: true
                },
                files: {
					'index.html': 'jade/index.jade',
				}
            }
        },
        //Notificaciones
        notify: {
            uglify: {
                options: {
                    enabled: true,
                    max_jshint_notifications: 1,
                    message: "uglify iniciado!"
                }
            },
            jadephp: {
                options: {
                    enabled: true,
                    max_jshint_notifications: 1,
                    message: "jade iniciado!"
                }
            },
            stylus: {
                options: {
                    enabled: true,
                    max_jshint_notifications: 1,
                    message: "stylus iniciado!"
                }
            },
        },
        //Server PHP
        php: {
            dist: {
                options: {
                    hostname: 'localhost',
                    port: 8000,
                    base: '', // Project root
                    keepalive: false,
                    open: false,
                    directives: {
                        'error_log': require('path').resolve('logs/error.log')
                    }
                }
            }
        },
        //BrowserSync
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'stylus/*.styl',
                        'jade/*.jade',
                        'javascript/*.js',
                    ]
                },
                options: {
                    proxy: '<%= php.dist.options.hostname %>:<%= php.dist.options.port %>',
                    watchTask: true,
                    notify: false,
                    open: true,
                    startPath: '',
                    reloadDelay: 2000,
                    injectChanges: true,
                    reloadOnRestart: true,
                    logLevel: 'silent',
                    ghostMode: {
                        clicks: true,
                        scroll: true,
                        links: true,
                        forms: true
                    }
                }
            }
        }
	});

	//Cargamos todos los tasks declarados en package.json
	require('load-grunt-tasks')(grunt);
	// Defino las tareas.
    grunt.registerTask('default', ['stylus', 'uglify', 'jadephp', 'notify', 'php:dist', 'browserSync', 'watch']);
	//grunt.registerTask('default', ['stylus', 'uglify', 'jadephp', 'notify', 'browserSync:dist', 'php:dist', 'watch']);
};