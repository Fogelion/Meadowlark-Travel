const express = require('express');
const handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
const fortunes = require('./lib/fortune.js');

const app = express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
	res.render('home');
});
app.get('/about', (req, res) => {
	var randomFortune =
		fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about', { fortune: fortunes.getFortune() });
});

// пользовательская страница 404
app.use((req, res) => {
	res.status(404);
	res.render('404');
});
// пользовательская страница 500
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});



app.listen(app.get('port'), () => {
	console.log( 'Express запущен на http://localhost:' +
		app.get('port') + '; нажмите Ctrl+C для завершения.' );
});