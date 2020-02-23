import GetProductByBarCode from '../../use_cases/GetProductByBarCode';

export async function getProduct(req, res) {
  const { barCode } = req.params;

  try {
    const product = await GetProductByBarCode.handle(barCode);
    const productObject = product.toObject();
    delete (productObject.__v);

    res.json({ ...productObject });
  } catch (error) {
    res.status(404);
    res.json({ error: 404, message: error.message });
  }
}
