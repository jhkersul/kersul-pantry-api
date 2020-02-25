import express from 'express';
import {
  createPantryProduct,
  deletePantryProduct,
  updatePantryProduct,
} from '../adapters/controllers/PantryProductsController';

const router = express.Router();

router.post('/', async (req, res) => {
  createPantryProduct(req, res);
});

router.delete('/:id', async (req, res) => {
  deletePantryProduct(req, res);
});

router.patch('/:id', async (req, res) => {
  updatePantryProduct(req, res);
});

module.exports = router;
