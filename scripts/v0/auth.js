const jwt = require('jsonwebtoken');

const { tokenKey } = require('../../src/config/config');

const verifyToken = (req, res, next) => {
	let token;
	try {
		// this will grab the token assuming we are sending it as a bearer token
		([, token] = req.headers.authorization.split(' '));

		const decoded = jwt.verify(token, tokenKey);

		req.user = decoded;

		return next();
	} catch (error) {
		if (!token) {
			return res.status(403).json({ message: 'A token is required' });
		}

		return res.status(401).json({ message: 'Invalid Token' });
	}
};

module.exports = verifyToken;
