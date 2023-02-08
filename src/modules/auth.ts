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
