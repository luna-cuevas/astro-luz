import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { commerce } from '../lib/commerce'
import { 
  Navigation, 
  Pagination, 
  EffectCreative, 
  Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "swiper/css/effect-creative";

const Home = ( { products, categories } ) => {

  const sliderImages = ['/images/candle1.jpg', '/images/candle2.jpg', '/images/candle3.jpg', '/images/candle4.jpg']

  return (
    <Layout categories={categories}>
      <div className=" flex flex-col min-h-screen">
        <div className='w-screen max-h-[90vh] overflow-hidden'>
          <Swiper
            modules={[ 
              Navigation, 
              Pagination, 
              EffectCreative,
              Autoplay]}
            slidesPerView={1}
            navigation
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            effect={"creative"}
            creativeEffect={{
              prev: {
                shadow: false,
                translate: [0, 0, -400],
              },
              next: {
                translate: ["100%", 0, 0],
              },
            }}
            className="mySwiper"
            style={{'color': 'white !important'}}
            pagination={{ clickable: true }}
          >
            {sliderImages.map((image, id) => (
              <SwiperSlide className="select-none">
                <img key={id} className='h-full p-2 bg-[#2e2e2e] m-auto rounded-lg' src={image} alt="" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className='flex flex-col w-screen min-h-screen'>
          <h1 className='mx-auto my-10 text-2xl'>Some of our favorites...</h1>
          <div className='flex'>
            {products.filter((product) => (
              (product.categories)
              .map(category => category.slug)
              .includes('our-favorites')))
              .map((product, id) => 
                <div className='w-1/3 m-auto overflow-hidden border-2 border-gray-300'>
                  <Swiper
                    modules={[ 
                      Navigation, 
                      Pagination, 
                      EffectCreative,
                      Autoplay]}
                    slidesPerView={1}
                    navigation
                    loop={true}
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                    }}
                    effect={"creative"}
                    creativeEffect={{
                      prev: {
                        shadow: false,
                        translate: [0, 0, -400],
                      },
                      next: {
                        translate: ["100%", 0, 0],
                      },
                    }}
                    className="mySwiper"
                    // style={{'color': 'white !important'}}
                    pagination={{ clickable: true }}
                  >
                    <SwiperSlide className="flex select-none">
                      <img key={id} className='h-full p-2 bg-[#2e2e2e] m-auto rounded-lg' src={product.image.url} alt="Product Image" />
                    </SwiperSlide>
                    <div className='flex flex-col items-center'>
                      <h2 className='text-xl text-black'>{product.name}</h2>
                      <p>{product.price.formatted_with_symbol}</p>
                      <button>Test</button>
                    </div>
                  </Swiper>
                </div> 
            )}
          </div>
        </div>
      </div>  
    </Layout>  
  )
}

export default Home
export async function getStaticProps() {
  const { data: products } = await commerce.products.list();
  const { data: categories } = await commerce.categories.list();
  return {
    props: {
      products,
      categories
    }
  }
}
