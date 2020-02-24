import { validateCreatePantryProduct } from '../validations/CreatePantryProductValidation';
import { respondError } from '../ErrorResponse';
import CreatePantryProduct from '../../use_cases/CreatePantryProduct';
import FindPantryProductSameExpiry from '../../use_cases/FindPantryProductSameExpiry';

async function addQuantityToPantryProduct(pantryProduct, quantity) {
  const updatedPantryProduct = pantryProduct;
  updatedPantryProduct.quantity += quantity;

  return pantryProduct.save();
}

function respondPantryProduct(res, pantryProduct, httpStatus) {
  res.status(httpStatus);
  res.json({ ...pantryProduct.toObject() });
}

export async function createPantryProduct(req, res) {
  const { body } = req;

  try {
    const validatedBody = validateCreatePantryProduct(body);
    const foundPantryProduct = await FindPantryProductSameExpiry.handle(
      validatedBody.productId,
      validatedBody.expiryDay,
      validatedBody.expiryMonth,
      validatedBody.expiryYear,
    );

    if (foundPantryProduct) {
      const updatedPantryProduct = await addQuantityToPantryProduct(
        foundPantryProduct,
        validatedBody.quantity,
      );

      respondPantryProduct(res, updatedPantryProduct, 200);
      return;
    }

    const createdPantryProduct = await CreatePantryProduct.handle(validatedBody);
    respondPantryProduct(res, createdPantryProduct, 201);
  } catch (error) {
    respondError(res, error);
  }
}
