const Joi = require('joi');

const fooIDValidator = Joi.object().keys({
	id: Joi.string().alphanum().max(24).required(),
});

const fooNameValidator = Joi.object().keys({
	name: Joi.string().max(100).required(),
});

module.exports = {
	fooIDValidator,
	fooNameValidator,
};
