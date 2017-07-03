let validator = {
	validatePost: function(req){
		req.checkBody('title', 'Title must not by empty').notEmpty();
		req.checkBody('title', 'Title has to be between 1 and 32 characters long.').len(1,32);
		req.checkBody('title', 'Title must be a string').isAscii();
		req.checkBody('author', 'Author must not by empty').notEmpty();
		req.checkBody('author', 'Author has to be between 1 and 32 characters long.').len(1,32);
		req.checkBody('author', 'Author must be a string').isAscii();
		return req.validationErrors();
	},
	validateGet: function(req){
		req.checkParams('title', 'Title must not by empty').notEmpty();
		req.checkParams('title', 'Title has to be between 1 and 32 characters long.').len(2,32);
		req.checkParams('title', 'Title must be a string').isAscii();
		return req.validationErrors();
	}
}

module.exports.validator = validator;
