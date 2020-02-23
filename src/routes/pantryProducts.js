import express from 'express';
import { createPantryProduct } from '../adapters/controllers/PantryProductsController';

const router = express.Router();

router.post('/', async (req, res) => {
  createPantryProduct(req, res);
});

module.exports = router;
