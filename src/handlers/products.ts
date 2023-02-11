import prisma from '../../db';

export const getProducts = async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id,
		},
		include: {
			// TODO update Product to products in prisma then everywhere else
			Product: true,
		},
	});

	res.json({ data: user.Product });
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
