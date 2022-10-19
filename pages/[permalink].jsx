import React, { useState, useEffect } from 'react'
import { commerce } from '../lib/commerce'
import Layout from '../components/Layout'
import parse from 'html-react-parser';
import windowSize from '../lib/windowSize';
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
//Firestore
import { getDocs, collection, addDoc, orderBy, query, limit } from "firebase/firestore";
import { db } from "../lib/firestore";
import ReviewModal from '../components/ReviewModal';
import ReactStars from 'react-rating-stars-component';
import Link from 'next/link';

const productDetails = ({ product, categories, reviews, combinedRelatedProducts }) => {
  const { decrementQty, incrementQty, qty, addToCart, setShowCart, handleAddToCart } = useStateContext();
  const [addReviewModal, setAddReviewModal] = useState(false);
  const reviewRatingsAvg = (reviews.map((review) => review.rating).reduce((a, b) => a + b, 0) / reviews.length).toFixed(1);
  const size = windowSize();
  
  const addReview = async (name, review, rating) => {
    try {
      const docRef = await addDoc(collection(db, "productReviews", product.permalink, `${product.permalink}-reviews`), {
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        id: `review-${reviews.length + 1}`,
        name: name,
        review: review,
        rating: rating
      });
      setAddReviewModal(false)
      console.log("Document written with ID: ", docRef.id);

    } catch (e) {
      console.error("Error adding document: ", e);
    };
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    setShowCart(true);
  };

  return (
    <Layout categories={categories}>
      <div className='md:flex-row flex flex-col'>
        <div className='md:w-1/2 p-10 bg-[linear-gradient(to_right,#f3daeb_57%,#fff_100%)]'>
          <div className='relative'>
            <div className='w-auto'>
              <Swiper
                modules={[ 
                  EffectCreative,
                  Autoplay]}
                slidesPerView={1}
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
                    opacity: 0
                  },
                  next: {
                    translate: ["100%", 0, 0],
                  },
                }}
              >
                {product.assets?.map((asset, id) => (
                  <SwiperSlide key={asset.id}>
                    <img className='w-3/4 m-auto' src={asset.url} alt={asset.name} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
        <div className='md:w-1/2 md:text-left flex flex-col px-10 py-6 text-center bg-white'> 
          <h1 className='text-3xl'>{product.name}</h1>
          <h2 className='my-4 text-2xl'>{product.price.formatted_with_symbol}</h2>
          <span className='whitespace-pre-wrap'>{parse(product.description)}</span>
          <div className="w-fit md:my-4 md:mx-0 flex items-center m-auto my-4 bg-white border-2 border-gray-200">
            <button className='ease m-auto scale-100 text-xl cursor-pointer px-3 py-3 font-extrabold text-[#ff0000] duration-300 hover:scale-150' onClick={decrementQty}><AiOutlineMinus /></button>
            <span className="px-3 border-l-2 border-r-2 border-gray-200">{qty}</span>
            <button className="ease text-xl scale-100 cursor-pointer px-3 py-3 duration-300 hover:scale-150 text-[#4cf326]" onClick={incrementQty}><AiOutlinePlus /></button>
          </div>
          <button
            type="button"
            className="ease m-auto my-2 md:mx-0 w-1/2 md:w-fit scale-100 cursor-pointer border-[1px] bg-[#745da7] py-[10px] px-[20px] text-white duration-500 hover:scale-110"
            onClick={() => handleAddToCart(product.id, qty)}
          >
            Add to Cart
          </button>
        </div> 
      </div>
      
      
      
      <div className='bg-[linear-gradient(to_bottom,#f3daeb_37%,#e3f6fa_100%)] py-[40px] px-[3%]'>
        <div className='flex flex-col bg-white p-[20px]'>
          <h1 className='w-full m-auto my-2 text-2xl text-center border-b-2'>Reviews</h1>
          <div>
            <span className='text-2xl'>{reviewRatingsAvg > 0 ? reviewRatingsAvg : 0}</span> out of 5 stars
            <ReactStars
              count={5}
              edit={false}
              value={Number(reviewRatingsAvg)}
              size={24}
              isHalf={true}
              activeColor="#86e1ff"
            />
          </div>
          
          <div className='flex justify-between my-4'>
            <div className='flex items-center'>
              1-10 of {reviews.length} reviews
            </div>
            <button className='bg-[#8cd0e3] transition-all duration-300 text-white w-fit px-4 py-2 hover:shadow-[3px_3px_0_#f5ea77]' onClick={() => setAddReviewModal(true)}>Add Review</button>
          </div>

          {reviews.length > 0 ? (
            <div>
              {reviews.map((review) => (
                <div className='flex flex-col md:flex-row py-[20px] border-t-2 border-gray-200' key={review.id}>
                  <div className='md:w-1/4 md:text-center md:justify-center'>
                    <h1 className='px-2'>{review.name}</h1>
                    <div>
                      <ReactStars
                        classNames='md:m-auto'
                        count={5}
                        edit={false}
                        value={review.rating}
                        size={24}
                        activeColor="#86e1ff"
                      />
                    </div>
                  </div>
                  <p className='md:w-1/2 md:my-auto md:text-center px-2 my-2'>{review.review}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className='m-auto'>
              <h1 className='text-xl'>No reviews yet...</h1>
            </div>
          )}

      

          {addReviewModal && (
            <>
              <button onClick={() => setAddReviewModal(false)} className='fixed top-0 bottom-0 left-0 right-0 z-10 w-full h-full bg-[#00000092]' />
              <ReviewModal  setAddReviewModal={setAddReviewModal} addReview={addReview} />
            </>
          )}
        </div>
        
      </div>
      <div className='bg-[#e3f6fa] py-5 flex flex-col'>
        <h1 className='w-3/4 m-auto mb-8 text-xl text-center border-b-2 border-gray-300'>You might also like:</h1>
        <Swiper
          modules={[ 
            Navigation, 
            EffectCreative,
            Autoplay]}
          slidesPerView={size.width > 640 ? 4 : 1}
          // navigation
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          // 
          className="mySwiper w-11/12 !h-full"
        >
          {combinedRelatedProducts.map((product, id) => (
            <SwiperSlide key={id}>
              <div className='flex flex-col items-center'>
                <img className='w-3/4 m-auto' src={product.image.url} alt={product.name} />
                <h1 className='text-xl'>{product.name}</h1>
                <h2 className='text-xl'>{product.price.formatted_with_symbol}</h2>
                <Link href={product.permalink}>
                  <button className='bg-[#8cd0e3] transition-all duration-300 text-white w-fit px-4 py-2 hover:shadow-[3px_3px_0_#f5ea77]'>View</button>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div> 
    </Layout>
  )
}

export default productDetails;

export async function getStaticProps({ params }) {
  // commerce.js
  const { permalink } = params;
  const { data: categories } = await commerce.categories.list();
  const product = await commerce.products.retrieve(permalink, {type: 'permalink'});

  const relatedProductsArrays = await Promise.all(
    product.categories
      .map((category) => category.slug)
      .map(async (category) => {
        const { data } = await commerce.products.list({category_slug: category})
        return data;
      }
    )
  );
  
  const combinedRelatedProducts = relatedProductsArrays.flatMap(productArray => productArray);

  //Firestore - Reviews
  let reviews = [];

  const reviewsRef = collection(db, "productReviews", product.permalink, `${product.permalink}-reviews`);
  const querySnapshot = await getDocs(query(reviewsRef, orderBy('createdAt', 'asc')));

  querySnapshot.forEach((doc) => {
    reviews.push({...doc.data(), id: doc.id});
  });
  
  return {
    props: {
      product,
      combinedRelatedProducts,
      categories,
      reviews
    },
  };
};

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
};