const expect = require('expect');
const request = require('supertest');

const {app} = require('./../app');

const utils = require('../lib/utils');


let books = [{"title": "cc", "author": "test"},{"title": "ee", "author": "test"},{"title": "aa", "author": "test"}];
let sorted = [{"title": "aa", "author": "test"},{"title": "cc", "author": "test"},{"title": "ee", "author": "test"}];

let book = {"title":"Dziennik", "author":"Eugene Delacroix"};


describe('Sorting books', () => { 
	let sortedBooks = utils.mergeSort(books);
	it('should return an array', (done) => {
		expect(sortedBooks).toBeAn('array');
		done();
	})
	it('should should return an sorted array ', (done) => {
		expect(sortedBooks).toEqual(sorted);
		done();
	})
})



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
	})
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
	})
})

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
	})
	it('should return error message if it cant find lower alphabetically title', (done) => {
		request(app)
			.get('/book/Albatros')
			.expect(400)
			.expect((res) => {
				expect(res.body.errorMsg).toBe("Currently no books");
			})
			.end(done)
	})
})