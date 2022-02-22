/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaid = require('chaid');
const faker = require('faker');
const mongoose = require('mongoose');

const { app, runServer, closeServer } = require('../bin/www');
const { db } = require('../scripts/v0');
const { logger } = require('../src/config/logging');
const { databaseURL, port } = require('../src/config/config');

// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaiHttp);
chai.use(chaid);

function tearDownDB() {
	return new Promise((resolve, reject) => {
		console.warn('Deleting database');
		db.conn.dropDatabase()
			.then((result) => resolve(result))
			.catch((err) => reject(err));
	});
}

function seedData() {
	logger.info('Seeding Data');
	const data = [];
	for (let i = 0; i < 10; i += 1) {
		data.push({
			name: faker.name.firstName().toLowerCase(),
		});
	}
	return db.exampleDB.Foo.insertMany(data);
}

describe('API resource', function () {
	before(function () {
		return runServer(`${databaseURL}/testExampleDb`, port);
	});
	beforeEach(function () {
		return seedData();
	});
	afterEach(function () {
		return tearDownDB();
	});
	after(function () {
		return closeServer();
	});
	describe('check env vars', function () {
		it('should have all listed env vars', function () {
			process.env.should.include.all.keys(
				'NODE_ENV',
				'NAME',
				'DATABASE_URL',
			);
		});
	});
	describe('GET endpoints', function () {
		it('should return all docs', function () {
			let res;
			return chai.request(app)
				.get('/foos')
				.then((_res) => {
					res = _res;
					res.should.have.status(200);
					res.body.should.have.length.of.at.least(1);
					return db.exampleDB.Foo.count();
				})
				.then((count) => {
					res.body.should.have.lengthOf(count);
				});
		});
		it('should return doc based on object ID', async function () {
			const { name, _id: id } = await db.exampleDB.Foo.findOne();
			return chai.request(app)
				.get(`/foos/${id}`)
				.then((res) => {
					res.should.have.status(200);
					res.body.name.should.equal(name);
				});
		});
	});
	describe('POST endpoints', function () {
		it('should create new doc', function () {
			const name = faker.name.firstName().toLowerCase();
			return chai.request(app)
				.post('/foos')
				.send({ name })
				.then((res) => {
					res.should.have.status(201);
					return db.exampleDB.Foo.findOne({ name });
				})
				.then((foo) => {
					foo.name.should.equal(name);
				});
		});
	});
	describe('DELETE endpoints', function () {
		it('should delete doc based on object ID', async function () {
			const { _id: id } = await db.exampleDB.Foo.findOne();
			return chai.request(app)
				.delete(`/foos/${id}`)
				.then((res) => {
					res.should.have.status(204);
					return db.exampleDB.Foo.findById(id);
				})
				.then((foo) => {
					should.not.exist(foo);
				});
		});
	});
	describe('PUT endpoints', function () {
		it('should update doc', async function () {
			const { _id: id } = await db.exampleDB.Foo.findOne();
			const updatedName = faker.name.firstName().toLowerCase();
			return chai.request(app)
				.put(`/foos/${id}`)
				.send({ name: updatedName })
				.then((res) => {
					res.should.have.status(200);
					res.body.should.have.id(mongoose.Types.ObjectId(id));
					return db.exampleDB.Foo.findById(id);
				})
				.then((foo) => {
					foo.name.should.equal(updatedName);
				});
		});
	});
});
