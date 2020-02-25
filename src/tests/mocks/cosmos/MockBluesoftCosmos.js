import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { COSMOS_BLUESOFT_URL, COSMOS_ACCESS_TOKEN } from '../../../config';
import getProductGtinResponse from './get-product-gtin-response.json';

export function mockSuccessGetProductByGtin(gtin) {
  const mock = new MockAdapter(axios);
  const headers = {
    'X-Cosmos-Token': COSMOS_ACCESS_TOKEN,
  };

  mock
    .onGet(`${COSMOS_BLUESOFT_URL}/gtins/${gtin}`, { headers })
    .reply(200, getProductGtinResponse);

  return mock;
}

export function mockFailedGetProductByGtin(invalidGtin) {
  const mock = new MockAdapter(axios);
  const headers = {
    'X-Cosmos-Token': COSMOS_ACCESS_TOKEN,
  };

  mock
    .onGet(`${COSMOS_BLUESOFT_URL}/gtins/${invalidGtin}`, { headers })
    .reply(404, { message: 'O recurso solicitado não existe' });

  return mock;
}
