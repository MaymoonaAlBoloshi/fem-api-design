import prisma from '../../db';
import { comparePassword, generateToken, hashPassword } from '../modules/auth';

export const createUser = async (req, res, next) => {
	try {
		const user = await prisma.user.create({
			data: {
				username: req.body.username,
				email: req.body.email,
				password: await hashPassword(req.body.password),
			},
		});

		const token = generateToken(user);

		res.json({ token });
	} catch (err) {
		err.type = 'input';
		next(err);
	}
};

export const loginUser = async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			email: req.body.email,
		},
	});

	const isValid = await comparePassword(req.body.password, user.password);

	if (!isValid) {
		res.status(401);
		res.json({ message: 'Invalid credentials' });
		return;
	}

	const token = generateToken(user);
	res.json({ token });
};
