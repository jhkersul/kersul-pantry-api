import axios from 'axios';
import { COSMOS_BLUESOFT_URL, COSMOS_ACCESS_TOKEN } from '../../config';

async function getProductByGtin(gtin) {
  const url = `${COSMOS_BLUESOFT_URL}/gtins/${gtin}`;
  const headers = {
    'X-Cosmos-Token': COSMOS_ACCESS_TOKEN,
  };

  try {
    const response = await axios.get(url, { headers });

    return response.data;
  } catch (error) {
    throw new Error('Product not found');
  }
}

export default { getProductByGtin };
