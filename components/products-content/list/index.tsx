import useSwr from 'swr';
import ProductItem from '../../product-item';
import ProductsLoading from './loading';

const ProductsContent = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSwr('/api/products', fetcher);
  if (error) return <div>Failed to load products</div>;
  return (
    <>
      {!data &&
        <ProductsLoading />
      }

      {data &&
        <section className="products-list">
          {data.map((item: any) => (
            <ProductItem
              id={item?.masterData?.current?.slug['en-US']}
              name={item?.masterData?.current?.name['en-US']}
              price={item?.masterData?.current?.masterVariant?.prices[0]?.value.centAmount}
              color={item?.masterData?.current?.masterVariant?.attributes[0]?.value.label}
              discount={item?.masterData?.current?.masterVariant?.prices[0]?.value.centAmount}
              currentPrice={item?.masterData?.current?.masterVariant?.prices[0]?.value.centAmount}
              key={item.id}
              img={item?.masterData?.current?.masterVariant?.images[0]?.url}
              images={item?.masterData?.current?.masterVariant?.images.map((img: any) => img.url)}
            />
          ))}
        </section>
      }
    </>
  );
};

export default ProductsContent