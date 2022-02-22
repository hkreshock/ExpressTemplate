// libraries
const mongoose = require('mongoose');
// custom libraries
const { logger } = require('../../src/config/logging');

// db models
const { v0: { fooSchema } } = require('../../models');

// models and connection function
const connOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
};

// connection and model object
const connObj = {
	// db
	exampleDB: {
		// collection
		Foo: null,
	},
	conn: null,
};

const gracefulExit = () => {
	mongoose.connection.close(() => {
		logger.info('Mongoose default connection with DB is disconnected through app termination');
		process.exit(0);
	});
};

const connect = async (databaseUrl) => {
	try {
		// connect to db
		const db = mongoose.createConnection(databaseUrl, connOptions);

		connObj.conn = db;

		db.once('open', () => logger.info('connected to DB'));

		// If the Node process ends, close the Mongoose connection
		process
			.on('SIGINT', gracefulExit)
			.on('SIGTERM', gracefulExit);

		// collections
		connObj.exampleDB.Foo = db.model('foos', fooSchema);
	} catch (error) {
		logger.error(error);
	}
};

connObj.connect = connect;

module.exports = connObj;
