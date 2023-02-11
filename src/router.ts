import { Router } from 'express';
import { body, oneOf, validationResult } from 'express-validator';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from './handlers/products';
import { handleInputError } from './modules/midldleware';
const router = Router();

/*
 * Products
 */

router.get('/products', getProducts);

router.get('/products/:id', getProduct);

router.put(
	'/products/:id',
	body('name').isString(),
	handleInputError,
	updateProduct
);

router.post(
	'/products',
	body('name').isString(),
	handleInputError,
	createProduct
);

router.delete('/products/:id', deleteProduct);

/*
 * Updates
 */

router.get('/updates', (req, res) => {});
router.get('/updates/:id', (req, res) => {});
router.put(
	'/updates/:id',
	body('title').optional(),
	body('body').optional(),
	body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
	body('version').optional(),
	handleInputError,
	(req, res) => {}
);
router.post(
	'/updates',
	body('title').exists().isString(),
	body('body').exists().isString(),
	handleInputError,
	(req, res) => {}
);
router.delete('/updates/:id', (req, res) => {});

/*
 * Update points
 */

router.get('/update-points', (req, res) => {});
router.get('/update-points/:id', (req, res) => {});
router.put(
	'/update-points/:id',
	body('name').optional().isString(),
	body('description').optional().isString(),
	handleInputError,
	(req, res) => {}
);
router.post(
	'/update-points',
	body('name').isString(),
	body('description').isString(),
	body('updateId').isString(),
	handleInputError,
	(req, res) => {}
);
router.delete('/update-points/:id', (req, res) => {});

export default router;
