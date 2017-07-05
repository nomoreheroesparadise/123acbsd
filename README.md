#Virutal bookshelf 

To install:
> unpack zip & npm install 

To start application:
> npm run start

To run tests:
> npm run test 


##### POST /book 
Adds alphabetically book to the book array. 
Book object: 
>  {"title": "test", "author": "test"}
Title must be ASCII string between 1 and 32 chars.
Author must be ASCII string between 1 and 32 chars.


##### GET /book/:title
Retrieves book with given title, or the book with closest lower alphabetical title. 
Title must be ASCII string between 1 and 32 chars.

##### GET /books
Retrives every book in books array.

##### GET /addBig
Adds 100 thousand books to the book array, one by one. 
After adding sends books array. 

