const mongoose = require('mongoose');

const { Schema } = mongoose;

const fooSchema = new Schema({
	name: {
		type: String,
		default: null,
	},
}, { timestamps: true });

module.exports = fooSchema;
