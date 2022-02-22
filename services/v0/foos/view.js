const { v0: { db } } = require('../../../scripts');

const view = (obj) => db.exampleDB.Foo.findById(obj.id);

module.exports = view;
