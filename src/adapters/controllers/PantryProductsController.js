import { validateCreatePantryProduct } from '../validations/CreatePantryProductValidation';
import { respondError } from '../ErrorResponse';
import CreatePantryProduct from '../../use_cases/CreatePantryProduct';

export async function createPantryProduct(req, res) {
  const { body } = req;

  try {
    const validatedBody = validateCreatePantryProduct(body);

    const pantryProduct = await CreatePantryProduct.handle(validatedBody);

    res.status(201);
    res.json({ ...pantryProduct.toObject() });
  } catch (error) {
    respondError(res, error);
  }
}
