import useSwr from 'swr';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductItem from 'components/product-item';

let slidesPerView = 1.3;
let centeredSlides = true;
let spaceBetween = 30;
if (process.browser) {
  if (window.innerWidth > 768) {
    slidesPerView = 3;
    spaceBetween = 35;
    centeredSlides = false;
  }
  if (window.innerWidth > 1024) {
    slidesPerView = 4;
    spaceBetween = 65;
    centeredSlides = false;
  }
}
const ProductsFeatured = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSwr('/api/products', fetcher);
  if (!data) return <div>Loading</div>;
  return (
    <section className="section section-products-featured">
      <div className="container">
        <header className="section-products-featured__header">
          <h3>Selected just for you</h3>
          <a href="/products" className="btn btn--rounded btn--border">Show All</a>
        </header>

        <div className="products-carousel">
          <Swiper
            spaceBetween={spaceBetween}
            loop={true}
            centeredSlides={centeredSlides}
            watchOverflow={true}
            slidesPerView={slidesPerView}
            className="swiper-wrapper">
            {data.map((item: any) => (
              console.log('item?.masterData?.slug ==>', item?.masterData?.current?.slug['en-US']),
              <SwiperSlide key={item.id}>
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
};

export default ProductsFeatured