require('dotenv').config();

const Joi = require('joi');

const envVarsSchema = Joi.object().keys({
	NODE_ENV: Joi.string().valid('production', 'development', 'staging').required(),
	PORT: Joi.number().positive(),
	DATABASE_URL: Joi.string().required(),
	NAME: Joi.string().required(),
	TOKEN_KEY: Joi.string(),
}).unknown();

const { value: envVars, error } = envVarsSchema.validate(process.env);

if (error) {
	throw new Error(error);
}

module.exports = {
	port: envVars.PORT || 3000,
	databaseURL: envVars.DATABASE_URL,
	nodeEnv: envVars.NODE_ENV,
	indexName: envVars.NAME,
	tokenKey: envVars.TOKEN_KEY,
};
