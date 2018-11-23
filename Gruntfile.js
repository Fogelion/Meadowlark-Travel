module.exports = function(grunt){
// Загружаем плагины
	[
		'grunt-mocha-test',
		'grunt-contrib-jshint',
		'grunt-exec',
	].forEach((task) => {
		grunt.loadNpmTasks(task);
	});
// Настраиваем плагины
	grunt.initConfig({
		mochaTest: {
			all: { src: 'qa/tests-*.js', options: { ui: 'tdd' }, }
		},
		// jshint: {
		// 	app: ['meadowlark.js', 'public/js/**/*.js','lib/**/*.js'],
		// 	qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js'],
		// },
		// exec: {
		// 	linkchecker:
		// 		{ cmd: 'linkchecker http://localhost:3000' }
		// },
	});
// Регистрируем задания
	grunt.registerTask('default', ['mochaTest']);
	// grunt.registerTask('default', ['mochaTest','jshint','exec']);
};