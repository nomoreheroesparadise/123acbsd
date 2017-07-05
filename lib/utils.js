/*
  @params {array} books List of books
  @params {string} title Title that we search
 */

function getBookByTitle(title, books) {
  let retriveBook = books.find(book => book.title === title);
  if(retriveBook){
    return retriveBook;
  } 
  let specificBook = {
    title
  };
  let location = locationOf(specificBook, books, alphabeticalCompare);
  if(location !== -1) {
    return books[location];
  } 
  return false;
};



/*
  @params {object} book A book with title, author attributes
  @params {array} books An array of boooks
 */

function insert(book, books) {
  books.splice(locationOf(book, books, alphabeticalCompare) + 1, 0, book);
  return books;
}

/*
  @params {object} book A book with title, author attributes
  @params {array} books An array of boooks
 */

function locationOf(book, books, comparer, start, end) {
    if (books.length === 0)
        return -1;

    start = start || 0;
    end = end || books.length;
    let pivot = parseInt(start + (end - start) /2, 10);  

    let c = comparer(book, books[pivot]);
    if (end - start <= 1) return c == -1 ? pivot - 1 : pivot;

    switch (c) {
        case -1: return locationOf(book, books, comparer, start, pivot);
        case 0: return pivot;
        case 1: return locationOf(book, books, comparer, pivot, end);
    };
};

/*
  @params {object} book A book with title, author attributes
  @params {int} pivot Middle value
 */

let alphabeticalCompare = function (book, pivot) {
    if (book.title.toLowerCase() < pivot.title.toLowerCase()) return -1;
    if (book.title.toLowerCase() > pivot.title.toLowerCase()) return 1;
    return 0;
};


module.exports.insert = insert;
module.exports.getBookByTitle = getBookByTitle;