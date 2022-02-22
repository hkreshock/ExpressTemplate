const { v0: { db } } = require('../../../scripts');

const remove = (obj) => db.exampleDB.Foo.findByIdAndDelete(obj.id);

module.exports = remove;
