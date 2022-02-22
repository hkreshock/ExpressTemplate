const { v0: { db } } = require('../../../scripts');

const list = () => db.exampleDB.Foo.find();

module.exports = list;
