const express = require('express');
const bodyParser = require('body-parser');
const {insert, getBookByTitle} = require('./lib/utils');
const {addBig} = require('./lib/bigdata');
const {validator} = require('./validators/validate');
const expressValidator = require('express-validator');

let app = express();


app.use(bodyParser.json());
app.use(expressValidator());

let books = [];

app.post('/book', (req,res) => {
	let errors = validator.validatePost(req);
	if(errors) {
		return res.status(400).send(errors);
	}

	let book = {
		title: req.body.title,
		author: req.body.author
	};
	let p =  Promise.resolve(books = insert(book, books));
	p.then(res.status(204).send());
});

app.get('/book/:title', (req, res) => {
	let errors = validator.validateGet(req);
	if(errors) {
		return res.status(400).send(errors);
	}

	let title = req.params.title;

	let book = getBookByTitle(title, books);
	if(book) {
		return res.status(200).send(book);
	}

	res.status(400).send({errorMsg: "Currently no books"});
});

app.get('/books', (req,res) => {
	res.send(books);
});

app.get('/addBig', (req,res) => {
	let p = Promise.resolve(addBig(books));
	p.then(res.send(books));
})

let port = process.env.PORT  || 3000;
port = (typeof port === "number") ? port : 3000;

if(!module.parent) { app.listen(port); }

console.log(`Application started. Listening on port: ${port}`);

module.exports = {app};