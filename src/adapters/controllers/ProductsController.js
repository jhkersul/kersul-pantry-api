import GetProductByBarCode from '../../use_cases/GetProductByBarCode';
import { respondError } from '../ErrorResponse';
import { validatePaginationQueryParams } from '../validations/PaginationQueryParamsValidation';
import GetProducts from '../../use_cases/GetProducts';

/**
 * GET /products/:barCode
 * @param {Object} req Express req
 * @param {Object} res Express res
 */
export async function getProduct(req, res) {
  const { barCode } = req.params;

  try {
    const product = await GetProductByBarCode.handle(barCode);

    res.json({ ...product.toObject() });
  } catch (error) {
    respondError(res, error);
  }
}

export async function getProducts(req, res) {
  try {
    const validatedParams = validatePaginationQueryParams(req.query);
    const { offset, limit } = validatedParams;

    const productsList = await GetProducts.handle(offset, limit);

    res.status(200);
    res.json(productsList);
  } catch (error) {
    respondError(res, error);
  }
}
