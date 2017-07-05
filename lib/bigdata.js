const {insert} = require('./utils');

function getRandomName(){
  return Math.random().toString(36).substring(7);
}

/*
  @params {array} books List of books
 */
function addBig(books) {
  let t=0;
  while(t< 100000){
      let book = {
        title: getRandomName(),
        author: 'test'
      }
      insert(book, books);
      t++;
  }
  return books;
}

module.exports.addBig = addBig;

