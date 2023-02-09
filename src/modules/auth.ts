import jwt from 'jsonwebtoken';
import bicrypt from 'bcrypt';

export const comparePassword = (password: string, hash: string) => {
	return bicrypt.compare(password, hash);
};

export const hashPassword = (password: string) => {
	return bicrypt.hash(password, 10);
};

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

	const [, token] = bearer.split(' ');

	if (!token) {
		res.status(401);
		res.json({ message: 'Invalid token' });
		return;
	}

	try {
		const decoded = jwt.verify(token, process.env.WT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		res.status(401);
		res.json({ message: 'Invalid token' });
		return;
	}
};
