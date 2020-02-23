import express from 'express';
import { getProduct } from '../adapters/controllers/ProductsController';

const router = express.Router();

router.get('/:barCode', async (req, res) => {
  getProduct(req, res);
});

module.exports = router;
