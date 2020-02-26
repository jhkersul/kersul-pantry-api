import express from 'express';
import { getProduct, getProducts } from '../adapters/controllers/ProductsController';

const router = express.Router();

router.get('/:barCode', async (req, res) => {
  getProduct(req, res);
});

router.get('/', async (req, res) => {
  getProducts(req, res);
});

module.exports = router;
