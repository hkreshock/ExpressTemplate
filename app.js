// libraries
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const { expressLogger, logger } = require('./src/config/logging');

// instantiate the Express app
const app = express();

// /////////////////////
// GENERAL MIDDLEWARE //
// /////////////////////

// CORS
app.use(cors());
// security
app.use(helmet());
// body parser
app.use(express.json({
	limit: '100kb',
	strict: true,
	type: 'application/json',
}));
// logger
app.use(expressLogger);

// /////////
// ROUTES //
// /////////

// health check
app.get('/foos/health', (req, res) => res.sendStatus(204));

const apiRouter = require('./api/router');

app.use('/', apiRouter);

// /////////////////
// ERROR HANDLING //
// /////////////////

app.use((error, req, res, next) => {
	res.err = error;
	if (error.isJoi) {
		return res.status(400).json({ [error.name]: error.details[0].message });
	} if (error.customError) {
		const { statusCode } = error;
		return res.status(statusCode).json({ [error.name]: error.message });
	}
	logger.error(error);
	res.sendStatus(500);
	return next();
});

module.exports = app;
