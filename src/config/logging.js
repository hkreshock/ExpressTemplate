const pino = require('pino');
const expressPino = require('express-pino-logger');
const { v4: uuidv4 } = require('uuid');

const { nodeEnv, indexName } = require('./config');

const pinoConfig = {
	level: nodeEnv === 'production' ? 'info' : 'debug',
	prettyPrint: nodeEnv !== 'production',
	name: indexName,
};

const logger = pino(pinoConfig);

const expressLogger = expressPino({
	logger,
	serializers: {
		req(req) {
			req.body = req.raw.body;
			req.query = req.raw.query;
			req.id = uuidv4();
			return req;
		},
	},
	customLogLevel: (res, err) => {
		if (res.statusCode >= 400 && res.statusCode < 500) return 'warn';
		if (res.statusCode >= 500 || err) return 'error';
		return 'info';
	},
});

module.exports = {
	logger,
	expressLogger,
};
