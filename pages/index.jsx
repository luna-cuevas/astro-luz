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
import Button from '../components/Button';

import TextTransition, { presets } from "react-text-transition";
import Link from 'next/link';


import CategoryList from "../components/CategoryList";
import ProductList from "../components/ProductList";


const Home = ( { products, categories } ) => {
  const swiper1Ref = useRef();
  const swiper2Ref = useRef();
  const size = windowSize();
  const [index, setIndex] = useState(0);


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

  const TEXTS = [
    "woman owned",
    "radically expressive",
    "uniquely ourselves",
    "proud"
  ];

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

  useEffect(() => {
    const intervalId = setInterval(() =>
      setIndex(index => index + 1),
      8000 // every 8 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <Layout categories={categories}>
      <div className="flex flex-col min-h-screen">
        <div className='!relative bg-white flex-col md:flex-row h-full py-5 mx-auto w-full flex'>
          <Swiper
            modules={[ 
              EffectCreative,
              Autoplay,
              Controller]}
            slidesPerView={1}
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

        <div className='md:mt-0 bg-[#f3f8fe] py-10 flex flex-col w-full h-fit m-auto'>
          <div className=' flex flex-col w-full max-w-[1600px] mx-auto'>
            <h1 className='mx-auto mb-10 text-2xl'>Some of our favorites...</h1>
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
                          <Link href={`/${product.permalink}`}>
                            <img key={id} className='max-h-[200px] mt-4 m-auto cursor-pointer rounded-lg' src={product.image.url} alt="Product Image" />
                          </Link>
                          <div className='flex flex-col items-center my-4'>
                            <h2 className='text-xl text-black'>{product.name}</h2>
                            {product.description.replace(/<[^>]+>/g, '')}
                            <p>{product.price.formatted_with_symbol}</p>
                            <Link href={`/${product.permalink}`}>
                              <button className='px-4 py-1 my-3 text-sm bg-gray-300'>ADD TO BAG</button>
                            </Link>
                          </div>
                        </div>
                      </SwiperSlide>
                    )
                  }
                </Swiper>
                <button className="prev-arrow top-1/2 absolute" onClick={handlePrev} >
                  <img className='w-fit h-fit' src="/images/back-arrow.png" alt="" />
                </button>
                <button className="next-arrow top-1/2 absolute right-0" onClick={handleNext} >
                  <img className='w-fit h-fit' src="/images/next-arrow.png" alt="" />
                </button>
              </div> 
            </div>
            <div className='justify-evenly flex flex-wrap gap-10 py-4 mx-10 border-t-2 border-b-2 border-gray-300'>
              <div className='w-fit flex gap-4'>
                <p className='m-auto text-xl text-center'>Only on astroluz.com</p>
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

        <div className='bg-[linear-gradient(to_bottom,#8cd0e3_0,#f08ccd_100%)] justify-evenly md:justify-center py-10 flex-col sm:flex-row  flex flex-wrap w-full h-fit m-auto'>
            {products
              .filter((product) => ((product.categories)
              .map(category => category.slug)
              .includes('featured')))
              .map((product, id) => 
                <div className='lg:w-1/3 sm:w-1/2 flex flex-col items-center w-full p-10'>
                  <img className='max-w-[450px] w-full' src={product.image.url} alt="" />
                  <div className='flex flex-col items-center w-9/12 m-auto -mt-6 bg-white'>
                    <h1 className='text-xl'>{product.name}</h1>
                    <p className='py-3 text-sm font-light'>Lorem ipsum dolor sit amet consectetur adipisicing eli.</p>
                    <div className='-mb-4'>
                      <Button text={`Shop ${product.name}`} link='' />
                    </div>   
                  </div>
                </div>
              )
            }
        </div>

        <div className='bg-[#d4deff] relative'>
          <div className='bg-[#bac9fb] top-0 bottom-0 right-0 left-0 z-0 m-auto w-3/4 h-4/6 md:w-1/3 md:h-1/2 absolute' />
          <div className='md:w-10/12 md:flex-row z-10 flex flex-col py-10 mx-auto'>
            <div className='md:w-1/2 md:order-1 z-10 flex flex-col justify-center order-2 w-10/12 mx-auto text-center'>
              <div className='md:w-2/3 md:my-0 flex flex-col mx-auto my-4'>
                <h1 className='text-2xl'>
                  We are <TextTransition direction='down' inline delay={1} springConfig={presets.gentle}>{TEXTS[index % TEXTS.length]}</TextTransition>
                </h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero voluptatum consequatur odit nam! Nulla adipisci eligendi animi recusandae a dicta.</p>
                <div className='flex items-center gap-2 mx-auto mt-4'>
                  <Button text='Learn more' link='/about' />
                  <Button text='Our Faves' link='/shop' />
                </div>
              </div>
            </div>
            <div className='md:w-1/2 z-10 order-1 w-10/12 m-auto'>
              <img src="images/we-are.png" alt="Who we are image" />
            </div>
          </div>
        </div>

        <div className='columns-4 flex justify-center flex-wrap bg-[#fff0f0]'>
          {products
            .filter((product) => ((product.categories)
            .map(category => category.slug)
            .includes('featured-collection')))
            .map((product, id) => 
              <div key={id} className='lg:w-1/4 sm:w-1/2 flex flex-col items-center w-screen p-10'>
                <div className='w-[300px] h-[300px] rounded-[50%] overflow-hidden'>
                  <img className='object-cover w-auto h-full m-0' src={product.image.url} alt="" />
                </div>
                <div className=' flex flex-col items-center w-9/12 m-auto my-4'>
                  <h1 className='text-lg text-center'>{product.name}</h1>
                  <p className='mb-4 text-sm font-light text-center'>Lorem ipsum dolor sit amet consectetur adipisicing eli.</p>
                </div>
                <Button text={`Shop ${product.name}`} link='' />
              </div>
            )
          }
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
