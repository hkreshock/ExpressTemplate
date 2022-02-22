const { v0: { validators: { fooNameValidator } } } = require('../../../scripts');
const { v0: { foos } } = require('../../../services');

// controller to add new foo to database
const create = async (req, res, next) => {
	try {
		const {
			value,
			error,
		} = fooNameValidator.validate(req.body);
		if (error) throw error;

		const result = await foos.create(value);

		return res.status(201).json(result);
	} catch (error) {
		return next(error);
	}
};

module.exports = create;
