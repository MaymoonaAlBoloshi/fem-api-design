import { body } from 'express-validator';
import prisma from '../../db';

export const getOneUpdate = async (req, res) => {
	try {
		const update = await prisma.update.findUnique({
			where: {
				id: req.params.id,
			},
		});

		res.json({ data: update });
	} catch (err) {
		console.error(err);
		res.status(500);
		res.json({ message: 'Internal server error' });
	}
};

export const getUpdates = async (req, res) => {
	try {
		const products = await prisma.product.findMany({
			where: {
				belongToId: req.user.id,
			},
			include: {
				updates: true,
			},
		});

		const updates = products.reduce((allUpdates, product) => {
			return [...allUpdates, ...product.updates];
		}, []);

		res.json({ data: updates });
	} catch (err) {
		console.error(err);
		res.status(500);
		res.json({ message: 'Internal server error' });
	}
};

export const createUpdate = async (req, res) => {
	try {
		const update = await prisma.update.create({
			data: {
				title: req.body.title,
				body: req.body.body,
				belongToId: req.user.id,
			},
		});

		res.json({ data: update });
	} catch (err) {
		console.error(err);
		res.status(500);
		res.json({ message: 'Internal server error' });
	}
};

export const updateUpdate = async (req, res) => {
	try {
		const update = await prisma.update.update({
			where: {
				id: req.params.id,
			},
			data: {
				title: req.body.title,
				body: req.body.body,
			},
		});

		res.json({ data: update });
	} catch (err) {
		console.error(err);
		res.status(500);
		res.json({ message: 'Internal server error' });
	}
};

export const deleteUpdate = async (req, res) => {
	try {
		const update = await prisma.update.delete({
			where: {
				id: req.params.id,
			},
		});

		res.json({ data: update });
	} catch (err) {
		console.error(err);
		res.status(500);
		res.json({ message: 'Internal server error' });
	}
};
