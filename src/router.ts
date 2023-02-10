import { Router } from 'express';
import { body, validationResult } from 'express-validator';
const router = Router();

/*
 * Products
 */

router.get('/products', (req, res) => {
	res.status(200);
	res.json({ message: req.abc, products: [] });
});
router.get('/products/:id', (req, res) => {});
router.put('/products/:id', body('name').isString(), (req, res) => {
	const errors = validationResult(req);
	console.log(errors);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	res.status(200);
	res.json({ message: 'success' });
});
router.post('/products', (req, res) => {});
router.delete('/products/:id', (req, res) => {});

/*
 * Updates
 */

router.get('/updates', (req, res) => {});
router.get('/updates/:id', (req, res) => {});
router.put('/updates/:id', (req, res) => {});
router.post('/updates', (req, res) => {});
router.delete('/updates/:id', (req, res) => {});

/*
 * Update points
 */

router.get('/update-points', (req, res) => {});
router.get('/update-points/:id', (req, res) => {});
router.put('/update-points/:id', (req, res) => {});
router.post('/update-points', (req, res) => {});
router.delete('/update-points/:id', (req, res) => {});

export default router;
