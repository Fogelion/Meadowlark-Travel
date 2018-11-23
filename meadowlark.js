const express = require('express');
const handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
const fortunes = require('./lib/fortune.js');

const app = express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});
app.get('/', (req, res) => {
	res.render('home');
});
app.get('/about', (req, res) => {
	var randomFortune =
		fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about', {
		fortune: fortunes.getFortune(),
		pageTestScript: '/qa/tests-about.js'
	});
});
app.get('/tours/hood-river', (req, res) => {
	res.render('tours/hood-river');
});
app.get('/tours/request-group-rate', (req, res) => {
	res.render('tours/request-group-rate');
});



// заголовки, пересылаемые браузером серверу
app.get('/headers', function(req,res){
	res.set('Content-Type','text/plain');
	let s = '';
	for(let name in req.headers)
		s += name + ': ' + req.headers[name] + '\n';
	res.send(s);
});
// пользовательская страница 500
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).render('500');
});
// пользовательская страница 404
app.use((req, res) => {
	res.status(404);
	res.render('404');
});




// отключение заголовков от сервера
app.disable('x-powered-by');

app.listen(app.get('port'), () => {
	console.log( 'Express запущен на http://localhost:' +
		app.get('port') + '; нажмите Ctrl+C для завершения.' );
});