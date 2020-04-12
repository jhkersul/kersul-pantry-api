import { validateCreateShoppingListProduct } from '../validations/CreateShoppingListProductValidation';
import { validateUpdateShoppingListProduct } from '../validations/UpdateShoppingListProductValidation';
import AddProductToShoppingList from '../../use_cases/AddProductToShoppingList';
import { respondError } from '../ErrorResponse';
import { validatePaginationQueryParams } from '../validations/PaginationQueryParamsValidation';
import { validatePathId } from '../validations/PathIdValidation';
import GetShoppingListProducts from '../../use_cases/GetShoppingListProducts';
import UpdateShoppingListProduct from '../../use_cases/UpdateShoppingListProduct';
import DeleteShoppingListProduct from '../../use_cases/DeleteShoppingListProduct';

function respondShoppingListProduct(res, shoppingListProduct, httpStatus) {
  res.status(httpStatus);
  res.json({ ...shoppingListProduct.toObject() });
}

function respondShoppingListProductList(res, shoppingListProductList, httpStatus) {
  res.status(httpStatus);
  res.json(shoppingListProductList);
}

/**
 * POST /shopping-list-products
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

/**
 * PATCH /shopping-list-products/:id
 * @param {Object} req Express req
 * @param {Object} res Express res
 */
export async function updateShoppingListProduct(req, res) {
  try {
    const validatedPathId = validatePathId(req.params);
    const { id } = validatedPathId;
    const validatedBody = validateUpdateShoppingListProduct(req.body);
    const updatedShoppingListProduct = await UpdateShoppingListProduct.handle(id, validatedBody);

    respondShoppingListProduct(res, updatedShoppingListProduct, 200);
  } catch (error) {
    respondError(res, error);
  }
}

/**
 * GET /shopping-list-products
 * @param {Object} req Express req
 * @param {Object} res Express res
 */
export async function getShoppingListProducts(req, res) {
  try {
    const validatedParams = validatePaginationQueryParams(req.query);
    const { limit, offset } = validatedParams;
    const shoppingListProductList = await GetShoppingListProducts.handle(offset, limit);

    respondShoppingListProductList(res, shoppingListProductList, 200);
  } catch (error) {
    respondError(res, error);
  }
}

/**
 * DELETE /shopping-list-products/:id
 * @param {Object} req Express req
 * @param {Object} res Express res
 */
export async function deleteShoppingListProduct(req, res) {
  try {
    validatePathId(req.params);

    const { id } = req.params;
    await DeleteShoppingListProduct.handle(id);

    res.status(204);
    res.send();
  } catch (error) {
    respondError(res, error);
  }
}
