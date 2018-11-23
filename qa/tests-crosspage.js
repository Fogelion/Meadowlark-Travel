const Browser = require('zombie'),
	assert = require('chai').assert;
var browser;
suite('Межстраничные тесты', () => {
	setup( () => {
		browser = new Browser();
	});
	test('запрос расценок для групп со страницы туров по реке Худ должен заполнять поле реферера', (done) => {
		const referrer = 'http://localhost:3000/tours/hood-river';
		browser.visit(referrer, () => {
			browser.clickLink('.requestGroupRate', () => {
				assert(browser.field('referrer').value === referrer);
				done();
			});
		});
	});
	test('запрос расценок для групп со страницы туров пансионата "Орегон Коуст" должен заполнять поле реферера', (done) => {
		const referrer = 'http://localhost:3000/tours/oregon-coast';
		browser.visit(referrer, () => {
			browser.clickLink('.requestGroupRate', () => {
				assert(browser.field('referrer').value === referrer);
				done();
			});
		});
	});
	test('посещение страницы "Запрос цены для групп" напрямую должен приводить к пустому полю реферера', (done) => {
		browser.visit('http://localhost:3000/tours/request-group-rate',
			() => {
				assert(browser.field('referrer').value=== '');
				done();
			});
	});
});