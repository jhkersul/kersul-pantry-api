import express from 'express';
import {
  createShoppingListProduct,
} from '../adapters/controllers/ShoppingListProductsController';

const router = express.Router();

router.post('/', async (req, res) => {
  createShoppingListProduct(req, res);
});

module.exports = router;
