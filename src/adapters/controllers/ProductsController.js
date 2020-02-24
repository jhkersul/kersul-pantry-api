import GetProductByBarCode from '../../use_cases/GetProductByBarCode';
import { respondError } from '../ErrorResponse';

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
