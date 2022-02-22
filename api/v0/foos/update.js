const { v0: { validators: { fooNameValidator, fooIDValidator } } } = require('../../../scripts');

const { v0: { foos } } = require('../../../services');

const update = async (req, res, next) => {
	try {
		const {
			value,
			error,
		} = fooNameValidator.validate(req.body);
		if (error) throw error;

		const {
			value: paramValue,
			error: paramError,
		} = fooIDValidator.validate(req.params);
		if (paramError) throw paramError;

		const updateObj = { ...value, ...paramValue };

		const result = await foos.update(updateObj);

		return res.status(200).json(result);
	} catch (error) {
		return next(error);
	}
};

module.exports = update;
