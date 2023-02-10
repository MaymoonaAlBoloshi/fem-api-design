import { Router } from 'express';
import { body, oneOf, validationResult } from 'express-validator';
import { handleInputError } from './modules/midldleware';
const router = Router();

/*
 * Products
 */

router.get('/products', (req, res) => {
	res.status(200);
	res.json({ message: req.abc, products: [] });
});

router.get('/products/:id', (req, res) => {});

router.put(
	'/products/:id',
	body('name').isString(),
	handleInputError,
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		res.status(200);
		res.json({ message: 'success' });
	}
);

router.post(
	'/products',
	body('name').isString(),
	handleInputError,
	(req, res) => {}
);

router.delete('/products/:id', (req, res) => {});

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
