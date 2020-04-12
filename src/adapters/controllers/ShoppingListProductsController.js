import { validateCreateShoppingListProduct } from '../validations/CreateShoppingListProductValidation';
import AddProductToShoppingList from '../../use_cases/AddProductToShoppingList';
import { respondError } from '../ErrorResponse';

function respondShoppingListProduct(res, shoppingListProduct, httpStatus) {
  res.status(httpStatus);
  res.json({ ...shoppingListProduct.toObject() });
}

function respondShoppingListProductList(res, shoppingListProductList, httpStatus) {
  res.status(httpStatus);
  res.json(shoppingListProductList);
}

/**
 * POST /pantry-products
 * @param {Object} req Express req
 * @param {Object} res Express res
 */
export async function createShoppingListProduct(req, res) {
  const { body } = req;

  try {
    const validatedBody = validateCreateShoppingListProduct(body);

    const shoppingListProduct = await AddProductToShoppingList.handle(validatedBody);

    respondShoppingListProduct(res, shoppingListProduct, 201);
  } catch (error) {
    respondError(res, error);
  }
}
