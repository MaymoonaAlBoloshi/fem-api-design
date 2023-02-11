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
		const product = await prisma.product.findUnique({
			where: {
				id: req.body.id,
			},
		});

		if (!product) {
			res.status(404);
			res.json({ message: 'Product not found' });
			return;
		}

		const update = await prisma.update.create({
			data: req.body,
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

		const match = updates.find((update) => update.id === req.params.id);

		if (!match) {
			res.status(404);
			res.json({ message: 'Update not found' });
			return;
		}

		const updateUpdate = await prisma.update.update({
			where: {
				id: req.params.id,
			},
			data: req.body,
		});

		res.json({ data: updateUpdate });
	} catch (err) {
		console.error(err);
		res.status(500);
		res.json({ message: 'Internal server error' });
	}
};

export const deleteUpdate = async (req, res) => {
	try {
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

		const match = updates.find((update) => update.id === req.params.id);

		if (!match) {
			res.status(404);
			res.json({ message: 'Update not found' });
			return;
		}

		const deleted = await prisma.update.delete({
			where: {
				id: req.params.id,
			},
		});

		res.json({ data: deleted });
	
	} catch (err) {
		console.error(err);
		res.status(500);
		res.json({ message: 'Internal server error' });
	}
};
