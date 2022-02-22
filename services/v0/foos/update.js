const { v0: { db } } = require('../../../scripts');

const update = (obj) => db.exampleDB.Foo.findByIdAndUpdate(
	obj.id,
	{ name: obj.name },
	{ new: true },
);

module.exports = update;
