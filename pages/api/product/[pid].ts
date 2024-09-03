import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../utils/commercetoolsClient';
import {
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
// fake data
//import products from '../../../utils/data/products';

/*export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { pid },
  } = req

  const product = products.find(x => x.id === pid);
  res.status(200).json(product);
}*/
const handler = async  (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { pid },
  } = req
  console.log('product qurery pid --- > : ' + pid);
  //console.log(req);
  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: 'dev-commerce' });
  try {
    const product = await apiRoot
      .products()
      .withKey({ key: `${pid}`  }).get()
      .execute()
      .then((response) => response.body);
    console.log('Product --- > Key ' +  JSON.stringify(product));
    //const product1 = products.find(x => x.id === pid);
    //console.log('Product --- > Key ' +  JSON.stringify(product1));
  res.status(200).json(product);
   // res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'error.message' });
  }
  
};
export default handler;