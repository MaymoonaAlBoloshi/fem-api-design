import { Router } from 'express';

const router = Router();

/*
 * Products
 */

router.get('/products', (req, res) => {});
router.get('/products/:id', (req, res) => {});
router.put('/products/:id', (req, res) => {});
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
