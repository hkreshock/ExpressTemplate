const { v0: { CustomError } } = require('../../../scripts');
const { v0: { db } } = require('../../../scripts');

const create = async (obj) => {
	const doc = await db.exampleDB.Foo.findOne(obj);
	if (doc) throw new CustomError('ExistingDoc');

	return db.exampleDB.Foo.create(obj);
};

module.exports = create;
