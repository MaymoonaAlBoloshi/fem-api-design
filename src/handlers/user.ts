import prisma from '../../db';
import { generateToken, hashPassword } from '../modules/auth';

export const createUser = async (req, res) => {
	const user = await prisma.user.create({
		data: {
			username: req.body.username,
			email: req.body.email,
			password: await hashPassword(req.body.password),
		},
	});

	const token = generateToken(user);

	res.json(token);
};
