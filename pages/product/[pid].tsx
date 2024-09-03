//import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useState } from 'react';
import Footer from '../../components/footer';
import Layout from '../../layouts/Main';
import Breadcrumb from '../../components/breadcrumb';
import ProductsFeatured from '../../components/products-featured';
import Gallery from '../../components/product-single/gallery';
import Content from '../../components/product-single/content';
import Description from '../../components/product-single/description';
//import Reviews from '../../components/product-single/reviews';
//import { server } from '../../utils/server'; 

// types
//import { ProductType } from 'types';

/*type ProductPageType = {
  product: ProductType;
}*/
const fetcher = (url: string) => fetch(url).then((res) => res.json());

/*export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const pid = query.pid;
  const res = await fetch(`${server}/api/product/${pid}`);
  const product = await res.json();
  console.log('Product --- > getServerSideProps: ' + JSON.stringify(product));
  return {
    props: {
      product,
    },
  }
}*/

const Product = () => {
  const [showBlock, setShowBlock] = useState('description');
  const router = useRouter();
  const { pid } = router.query;

  const { data: product, error } = useSWR(pid ? `/api/product/${pid}` : null, fetcher);
  if (error) return <div>Failed to load products</div>;
  if (!product) return <div>Loading...</div>;
  console.log('Product --- > content -1 : ' + JSON.stringify(product));
  return (
    <Layout>
      <Breadcrumb />

      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <Gallery images={product?.masterData?.current?.masterVariant?.images.map((img: any) => img.url)} />
            <Content product={product} />
          </div>

           <div className="product-single__info">
            <div className="product-single__info-btns">
              <button type="button" onClick={() => setShowBlock('description')} className={`btn btn--rounded ${showBlock === 'description' ? 'btn--active' : ''}`}>Description</button>
              <button type="button" onClick={() => setShowBlock('reviews')} className={`btn btn--rounded ${showBlock === 'reviews' ? 'btn--active' : ''}`}>Reviews (2)</button>
            </div>

            <Description description={product?.masterData?.current?.description['en-US']} show={showBlock === 'description'} />
            
          </div> 
        </div>
      </section>

      <div className="product-single-page">
        <ProductsFeatured />
      </div>
      <Footer />
    </Layout>
  );
}

export default Product
