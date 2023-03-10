import prisma from '../../db';

export const getProducts = async (req, res) => {
	const products = await prisma.product.findMany({
		where: {
			belongToId: req.user.id,
		},
	});

	res.json({ data: products });
};

export const getProduct = async (req, res) => {
	const id = req.params.id; // the product id

	const product = await prisma.product.findFirst({
		where: {
			id,
			belongTo: req.user.id, // the user id
		},
	});

	res.json({ data: product });
};

// not working
export const createProduct = async (req, res) => {
	const product = await prisma.product.create({
		data: {
			name: req.body.name,
			belongToId: req.user.id,
		},
	});

	res.json({ data: product });
};

// not working
export const updateProduct = async (req, res) => {
	const updated = await prisma.product.update({
		where: {
			id: req.params.id,
			id_belongToId: {
				id: req.user.id,
				belongToId: req.user.id,
			},
		},
		data: {
			name: req.body.name,
		},
	});

	res.json({ data: updated });
};

export const deleteProduct = async (req, res) => {
	const deleted = await prisma.product.delete({
		where: {
			id: req.params.id,
			id_belongToId: {
				id: req.user.id,
				belongToId: req.user.id,
			},
		},
	});

	res.json({ data: deleted });
};
