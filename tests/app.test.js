const expect = require('expect');
const request = require('supertest');

const {app} = require('./../app');

const {insert, getBookByTitle,alphabeticalCompare} = require('../lib/utils');
const bigdata = require('../lib/bigdata');


let book = {"title":"Dziennik", "author":"Eugene Delacroix"};

let unsortedBooksArray = [{"title":"dra", "author":"test"}, {"title":"az", "author":"test"}, {"title":"wtf", "author":"test"},{"title":"bum", "author":"test"},{"title":"bum", "author":"test"}];
let addedBooks = [];

describe("Adding books alphabetically", () => {
	unsortedBooksArray.forEach((book) => insert(book, addedBooks));
	it('should return an array', (done) => {
		expect(addedBooks).toBeAn('array');
		done();
	});
	it('should should return an sorted array ', (done) => {
		expect(addedBooks).toEqual(unsortedBooksArray.sort(alphabeticalCompare));
		done();
	});
});


describe("Finding book in books", () => {
	it('should return an object', (done) => {
		expect(getBookByTitle('dra', addedBooks)).toBeAn('object');
		done();
	})
	it('should should return a correct book ', (done) => {
		expect(getBookByTitle('dra', addedBooks)).toEqual({"title":"dra", "author":"test"});
		done();
	});
	it('should should return a false ', (done) => {
		expect(getBookByTitle('a', addedBooks)).toEqual(false);
		done();
	});
	it('should should return a closest book ', (done) => {
		expect(getBookByTitle('azbra', addedBooks)).toEqual({"title":"az", "author":"test"});
		done();
	});
});

describe('POST /book', () => {
	it('should return 204 if added properly',(done) => {
		request(app)
			.post('/book')
			.send(book)
			.expect(204)
			.end((err, res) => {
				if(err) {
					return done(err);
				}
				done();
			})
	});
	it('should not add book with invalid data', (done) => {
		request(app)
			.post('/book')
			.send({"title":"", "author":"Jerzy grabowski"})
			.expect(400)
			.end((err,res) => {
				if(err) {
					return done(err)
				}
				done();
			})
	});
});

describe('GET /book/:title', () => {
	it('should return book by title', (done) => {
		request(app)
			.get(`/book/${book.title}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.author).toBe(book.author);
			})
			.end(done)
	});
	it('should return closest book to the title', (done) => {
		request(app)
			.get('/book/Westerplatte')
			.expect(200)
			.expect((res) => {
				expect(res.body.title).toBe(book.title);
			}) 
			.end(done);
	});
	it('should return error message if it cant find lower alphabetically title', (done) => {
		request(app)
			.get('/book/Albatros')
			.expect(400)
			.expect((res) => {
				expect(res.body.errorMsg).toBe("Currently no books");
			})
			.end(done)
	});
});