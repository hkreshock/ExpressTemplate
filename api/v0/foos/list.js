const { v0: { foos } } = require('../../../services');

const list = async (req, res, next) => {
	try {
		console.log(req.user);
		const result = await foos.list();

		return res.status(200).json(result);
	} catch (error) {
		return next(error);
	}
};

module.exports = list;
