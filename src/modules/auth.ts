import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
	return jwt.sign(
		{
			_id: user.id,
			name: user.name,
		},
		process.env.WT_SECRET
	);
};

export const protect = (req, res, next) => {
	const bearer = req.headers.authorization;

	if (!bearer) {
		res.status(401);
		res.json({ message: 'Not authorized' });
		return;
	}
};
