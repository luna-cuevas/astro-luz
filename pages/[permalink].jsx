import React from 'react'
import { commerce } from '../lib/commerce'
import Layout from '../components/Layout'
import parse from 'html-react-parser';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useStateContext } from '../context/StateContext';
import { 
  Navigation, 
  EffectCreative, 
  Autoplay,
  Controller } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "swiper/css/effect-creative";




const productDetails = ({ product, categories, productDescription }) => {
  const { decrementQty, incrementQty, qty, addToCart, setShowCart, handleAddToCart } = useStateContext()
  const handleBuyNow = () => {
    addToCart(product, qty)
    setShowCart(true)
  }

  return (
    <Layout categories={categories}>
      <div className='bg-gradient-to-r flex from-[#f3daeb] to-white'>
        <div className='w-1/2'>
          <div className='relative'>
            <div className='w-auto'>
              <Swiper
                modules={[ 
                  EffectCreative,
                  Autoplay,
                  Controller,
                  Navigation]}
                slidesPerView={1}
                loop={true}
                autoplay={{
                  delay: 10000,
                  disableOnInteraction: false,
                }}
                // onSwiper={(swiper) => {
                //   swiper1Ref.current = swiper;
                // }}
                navigation={true}
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
              >
                {product.assets?.map((asset) => (
                  <SwiperSlide>
                    <img className='w-3/4 m-auto' key={asset.id} src={asset.url} alt={asset.name} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
       
          </div>
        </div>
        <div className='w-1/2 pt-10'> 
          <h1 className='mb-4 text-3xl'>{product.name}</h1>

          <span className='whitespace-pre-wrap'>{parse(productDescription)}</span>
          <div className="w-fit flex items-center my-4 bg-white">
            <button className='ease m-auto scale-100 text-xl cursor-pointer px-3 py-3 font-extrabold text-[#ff0000] duration-300 hover:scale-150' onClick={decrementQty}><AiOutlineMinus /></button>
            <span className="px-3 border-l-2 border-r-2 border-gray-200">{qty}</span>
            <button className="m-auto ease text-xl scale-100 cursor-pointer px-3 py-3 duration-300 hover:scale-150 text-[#4cf326]" onClick={incrementQty}><AiOutlinePlus /></button>
          </div>
          <button
            type="button"
            className="ease m-auto w-1/4 scale-100 cursor-pointer border-[1px] bg-[#745da7] py-[10px] px-[20px] text-white duration-500 hover:scale-110"
            onClick={() => handleAddToCart(product.id, qty)}
          >
            Add to Cart
          </button>
          {/* <span className='' dangerouslySetInnerHTML={{__html: productDescription}}></span> */}
        </div> 
      </div>  
    </Layout>
  )
}

export default productDetails;

export async function getStaticProps({ params }) {
  const { permalink } = params;
  const { data: categories } = await commerce.categories.list();

  const product = await commerce.products.retrieve(permalink, {
    type: 'permalink',
  });

  const productDescription = product.description;

  return {
    props: {
      product,
      categories,
      productDescription
    },
  };
}

export async function getStaticPaths() {
  const { data: products } = await commerce.products.list();

  return {
    paths: products.map((product) => ({
      params: {
        permalink: product.permalink,
      },
    })),
    fallback: false,
  };
}