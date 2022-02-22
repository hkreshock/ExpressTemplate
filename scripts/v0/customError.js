const errorObjs = {
	TestError: {
		// user whatever status code is applicable
		statusCode: 418,
		// insert custom message
		message: 'I\'m short and stout',
	},
	ExistingDoc: {
		statusCode: 409,
		message: 'Document Already Exists in Database',
	},
};

class CustomError extends Error {
	constructor(name) {
		super(name);
		this.name = name;
		this.statusCode = errorObjs[name].statusCode;
		this.message = errorObjs[name].message;
		this.customError = true;
	}
}

module.exports = CustomError;
