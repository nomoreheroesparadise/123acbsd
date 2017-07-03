/*
  @params {array} books List of books
  @params {string} title Title that we search
 */

function getBookByTitle(books, title) {
  if(books < 1) {
    return false;
  }
  let retriveBook = books.find(book => book.title === title);
  if(retriveBook) {
    return retriveBook;
  } else {
    return findClosestTitle(books, title);
  }
}


/*
  @params {array} books List of books
  @params {string} title Title that we search
  Case insensitivity check.  ASD === asd 
  Works only on strings from range [A-Za-z]
 */

function findClosestTitle(books, title) {
  let titleArray = title.split('');
  
  for(let i=titleArray.length-1; i>=0; i--) {

    let letterCode = titleArray[i].toLowerCase().charCodeAt(0);

    while(letterCode > 97) {
      letterCode--;
      titleArray[i] = String.fromCharCode(letterCode);
      let potentialMatch = titleArray.join('');
      let retrieveBook = books.find(book => {
        return book.title.slice(0,potentialMatch.length).toLowerCase() === potentialMatch.toLowerCase();
      });
      if(retrieveBook) {
        return retrieveBook;
      }
    }
    titleArray.pop();
  }

  return false;
}


/*
  @params {array} arr List of books
 */

function mergeSort(arr){
   let len = arr.length;
   if(len <2)
      return arr;
   let mid = Math.floor(len/2),
       left = arr.slice(0,mid),
       right =arr.slice(mid);
   return mergeByTitle(mergeSort(left),mergeSort(right));
};
        

/*
  @params {array} left Left side of array
  @params {array} right Right side of array
 */

function mergeByTitle(left, right){
  let result = [],
      lLen = left.length,
      rLen = right.length,
      l = 0,
      r = 0;

  while(l < lLen && r < rLen){
     if(left[l].title.charCodeAt(0) < right[r].title.charCodeAt(0)){
       result.push(left[l++]);
     }
     else{
       result.push(right[r++]);
    }
  }  

  return result.concat(left.slice(l)).concat(right.slice(r));
};

module.exports.mergeSort = mergeSort;
module.exports.getBookByTitle = getBookByTitle;