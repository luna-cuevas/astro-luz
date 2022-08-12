import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import Layout from '../components/Layout';
import { commerce } from '../lib/commerce'
import { 
  Navigation, 
  Pagination, 
  EffectCreative, 
  Autoplay,
  Controller } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "swiper/css/effect-creative";

import windowSize from '../lib/windowSize';

const Home = ( { products, categories } ) => {
  const swiper1Ref = useRef();
  const swiper2Ref = useRef();
  const size = windowSize();

  const sliderImages = [
    {
      image: '/images/candle1.jpg', 
      description: `Get 30% Off Everything Use promo code Astro`, 
      bgColor: 'linear-gradient(to right,#ebfff2 0,#FF931C 100%)',
      bgColorMobile: 'linear-gradient(to bottom,#ebfff2 0,#FF931C 100%)',
    },
    {
      image: '/images/candle2.jpg', 
      description: 'image slide two', 
      bgColor: 'linear-gradient(to right,#FFE4C9 0,#1c73ff 100%)',
      bgColorMobile: 'linear-gradient(to bottom,#FFE4C9 0,#1c73ff 100%)'
    },
    {
      image: '/images/candle3.jpg', 
      description: 'image slide three', 
      bgColor: 'linear-gradient(to right,#FFE4C9 0,#79ffa6 100%)',
      bgColorMobile: 'linear-gradient(to bottom,#FFE4C9 0,#79ffa6 100%)'
    },
    {
      image: '/images/candle4.jpg', 
      description: 'image slide four', 
      bgColor: 'linear-gradient(to right,#FFE4C9 0,#ff8ccd 100%)',
      bgColorMobile: 'linear-gradient(to bottom,#FFE4C9 0,#ff8ccd 100%)'
    },
  ]

  useLayoutEffect(() => {
    swiper1Ref.current.controller.control = swiper2Ref.current;
    swiper2Ref.current.controller.control = swiper1Ref.current;
  }, []);

  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);


  return (
    <Layout categories={categories}>
      <div className="flex flex-col min-h-screen">
        <div className='!relative bg-white flex-col md:flex-row h-full py-5 mx-auto w-full flex'>
          <Swiper
            modules={[ 
              Navigation, 
              Pagination, 
              EffectCreative,
              Autoplay,
              Controller]}
            slidesPerView={1}
            navigation
            loop={true}
            autoplay={{
              delay: 10000,
              disableOnInteraction: false,
            }}
            onSwiper={(swiper) => {
              swiper1Ref.current = swiper;
            }}
            effect={"creative"}
            creativeEffect={{
              prev: {
                shadow: false,
                translate: [0, 0, -400],
                opacity: 0
              },
              next: {
                translate: ["100%", 0, 0],
              },
            }}
            className="mySwiper sm:max-w-[300px] md:max-w-[400px] lg:max-w-[550px] !mx-0 !z-50 "
            style={{'color': 'white !important'}}
            pagination={{ clickable: true }}
          >
            {sliderImages.map((item, id) => (
              <SwiperSlide style={{'backgroundImage': size.width < 640 ? item.bgColorMobile : ''}} className="flex flex-col p-4 select-none">
                <img key={id} className='h-full p-2 bg-[#2e2e2e] mx-0 m-auto rounded-lg' src={item.image} alt="" />
                {size.width < 640 && (
                  <div  className={`m-auto text-black flex flex-wrap h-full w-full`}>
                    <h1 className='m-auto mt-10 text-2xl'>{item.description}</h1>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper 
            modules={[ 
              Autoplay,
              Controller]}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 10000,
              disableOnInteraction: false,
            }}  
            onSwiper={(swiper) => {
              swiper2Ref.current = swiper;
            }}
            className="right-0 mx-0 hidden sm:block max-h-[200px] sm:max-h-[400px] h-screen relative sm:!absolute w-full sm:w-4/5 sm:h-full  ">
            {sliderImages.map((item, id) => (
              <SwiperSlide style={{'backgroundImage': item.bgColor}} key={id} className="flex m-auto mx-0 select-none">
                <div  className={`m-auto flex flex-wrap h-full w-full`}>
                  <h1 className='lg:m-auto flex mt-auto mb-0 sm:my-auto m-auto sm:mr-10 text-2xl max-w-[300px]'>{item.description}</h1>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className='md:mt-0 bg-[#f3f8fe] flex flex-col w-full min-h-screen m-auto'>
          <div className=' flex flex-col w-full max-w-[1600px] mx-auto'>
            <h1 className='mx-auto my-10 text-2xl'>Some of our favorites...</h1>
            <div className='md:px-10 flex overflow-hidden'>
              <div className='relative w-full px-0 m-auto'>
                <Swiper
                  modules={[ 
                    Navigation, 
                    Pagination, 
                    EffectCreative,
                    Autoplay]}
                  ref={sliderRef}
                  slidesPerView={size.width > 640 ? 4 : 1}
                  // navigation
                  loop={true}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  // 
                  className="mySwiper w-11/12 !h-full"
                  pagination={{ clickable: true }}
                >
                  {products
                    .filter((product) => ((product.categories)
                    .map(category => category.slug)
                    .includes('our-favorites')))
                    .map((product, id) => 
                      <SwiperSlide className="md:px-0 flex flex-col h-full px-10 mb-10 select-none">
                        <div className='bg-[white] mx-1 !h-full'>
                          <img key={id} className='max-h-[200px] mt-4 m-auto rounded-lg' src={product.image.url} alt="Product Image" />
                          <div className='flex flex-col items-center my-4'>
                            <h2 className='text-xl text-black'>{product.name}</h2>
                            {product.description.replace(/<[^>]+>/g, '')}
                            <p>{product.price.formatted_with_symbol}</p>
                            <button className='px-4 py-1 my-3 text-sm bg-gray-300'>ADD TO BAG</button>
                          </div>
                        </div>
                      </SwiperSlide>
                  )}
                </Swiper>
                <button className="prev-arrow top-1/2 absolute" onClick={handlePrev} >
                  <img className='w-fit h-fit' src="/images/back-arrow.png" alt="" />
                </button>
                <button className="next-arrow top-1/2 absolute right-0" onClick={handleNext} >
                  <img className='w-fit h-fit' src="/images/next-arrow.png" alt="" />
                </button>
              </div> 
            </div>
            <div className='flex justify-center gap-10 py-4 mx-10 border-2 border-gray-300'>
              <div className='flex gap-4 max-w-[200px]'>
                <p className='m-auto text-xl text-center'>Only on www.astroluz.com</p>
              </div>
              <div className='flex gap-4 max-w-[200px]'>
                <img className='' src="/images/free-shipping-icon.png" alt="" />
                <p className='text-sm text-center'>FREE SHIPPING <br /> (on orders over $40)</p>
              </div>
              <div className='flex gap-4 max-w-[200px]'>
                <img className='' src="/images/free-shipping-icon.png" alt="" />
                <p className='text-sm text-center'>FREE SHIPPING <br /> (on orders over $40)</p>
              </div>
              <div className='flex gap-4 max-w-[200px]'>
                <img className='' src="/images/free-shipping-icon.png" alt="" />
                <p className='text-sm text-center'>FREE SHIPPING <br /> (on orders over $40)</p>
              </div>
            </div>
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
