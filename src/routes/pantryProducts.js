import express from 'express';
import { createPantryProduct, deletePantryProduct } from '../adapters/controllers/PantryProductsController';

const router = express.Router();

router.post('/', async (req, res) => {
  createPantryProduct(req, res);
});

router.delete('/:id', async (req, res) => {
  deletePantryProduct(req, res);
});

module.exports = router;
