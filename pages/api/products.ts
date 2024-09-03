import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../utils/commercetoolsClient';
import {
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: 'dev-commerce' });
   try {
    const products = await apiRoot
      .products()
      .get()
      .execute()
      .then((response) => response.body.results);
    //console.log('Products --- > id en-us: ' + products.map((product) => JSON.stringify(product.masterData.current.name['en-US'])));
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'error.message' });
  }
};

export default handler;