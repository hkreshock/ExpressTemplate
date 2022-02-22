const { v0: { foos } } = require('../../../services');

const remove = async (req, res, next) => {
	try {
		const { id } = req.params;
		await foos.remove({ id });

		return res.sendStatus(204);
	} catch (error) {
		return next(error);
	}
};

module.exports = remove;
