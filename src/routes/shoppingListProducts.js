import express from 'express';
import {
  createShoppingListProduct,
  getShoppingListProducts,
  updateShoppingListProduct,
  deleteShoppingListProduct,
} from '../adapters/controllers/ShoppingListProductsController';

const router = express.Router();

router.delete('/:id', async (req, res) => {
  deleteShoppingListProduct(req, res);
});

router.patch('/:id', async (req, res) => {
  updateShoppingListProduct(req, res);
});

router.post('/', async (req, res) => {
  createShoppingListProduct(req, res);
});

router.get('/', async (req, res) => {
  getShoppingListProducts(req, res);
});

module.exports = router;
