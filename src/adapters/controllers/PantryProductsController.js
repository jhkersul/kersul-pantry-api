import { validateCreatePantryProduct } from '../validations/CreatePantryProductValidation';
import { respondError } from '../ErrorResponse';
import CreatePantryProduct from '../../use_cases/CreatePantryProduct';
import GetPantryProducts from '../../use_cases/GetPantryProducts';
import FindPantryProductSameExpiry from '../../use_cases/FindPantryProductSameExpiry';
import DeletePantryProduct from '../../use_cases/DeletePantryProduct';
import { validatePathId } from '../validations/PathIdValidation';
import UpdatePantryProduct from '../../use_cases/UpdatePantryProduct';
import { validateUpdatePantryProduct } from '../validations/UpdatePantryProductValidation';
import { validatePaginationQueryParams } from '../validations/PaginationQueryParamsValidation';

function respondPantryProduct(res, pantryProduct, httpStatus) {
  res.status(httpStatus);
  res.json({ ...pantryProduct.toObject() });
}

function respondPantryProductList(res, pantryProductsList, httpStatus) {
  res.status(httpStatus);
  res.json(pantryProductsList);
}

/**
 * POST /pantry-products
 * @param {Object} req Express req
 * @param {Object} res Express res
 */
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
      const updatedPantryProduct = await UpdatePantryProduct.handle(
        foundPantryProduct.id,
        { quantity: validatedBody.quantity + foundPantryProduct.quantity },
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

/**
 * DELETE /pantry-products/:id
 * @param {Object} req Express req
 * @param {Object} res Express res
 */
export async function deletePantryProduct(req, res) {
  try {
    validatePathId(req.params);

    const { id } = req.params;
    await DeletePantryProduct.handle(id);

    res.status(204);
    res.send();
  } catch (error) {
    respondError(res, error);
  }
}

/**
 * PATCH /pantry-products/:id
 * @param {Object} req Express req
 * @param {Object} res Express res
 */
export async function updatePantryProduct(req, res) {
  try {
    const validatedPathId = validatePathId(req.params);
    const { id } = validatedPathId;
    const validatedBody = validateUpdatePantryProduct(req.body);
    const updatedPantryProduct = await UpdatePantryProduct.handle(id, validatedBody);

    respondPantryProduct(res, updatedPantryProduct, 200);
  } catch (error) {
    respondError(res, error);
  }
}

/**
 * GET /pantry-products
 * @param {Object} req Express req
 * @param {Object} res Express res
 */
export async function getPantryProducts(req, res) {
  try {
    const validatedParams = validatePaginationQueryParams(req.query);
    const { limit, offset } = validatedParams;
    const pantryProductsList = await GetPantryProducts.handle(offset, limit);

    respondPantryProductList(res, pantryProductsList, 200);
  } catch (error) {
    respondError(res, error);
  }
}
