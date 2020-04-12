import express from 'express';
import {
  createShoppingListProduct,
  getShoppingListProducts,
  updateShoppingListProducts,
} from '../adapters/controllers/ShoppingListProductsController';

const router = express.Router();

router.patch('/:id', async (req, res) => {
  updateShoppingListProducts(req, res);
});

router.post('/', async (req, res) => {
  createShoppingListProduct(req, res);
});

router.get('/', async (req, res) => {
  getShoppingListProducts(req, res);
});

module.exports = router;
