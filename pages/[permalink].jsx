import React, { useState, useEffect } from 'react'
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
//Firestore
import { getDocs, collection, addDoc, orderBy, query, limit } from "firebase/firestore";
import { db } from "../lib/firestore";
import ReviewModal from '../components/ReviewModal';
import ReactStars from 'react-rating-stars-component';

const productDetails = ({ product, categories, productDescription, reviews }) => {
  const { decrementQty, incrementQty, qty, addToCart, setShowCart, handleAddToCart } = useStateContext()
  const [addReviewModal, setAddReviewModal] = useState(false)
  const reviewRatingsAvg = (reviews.map((review) => review.rating).reduce((a, b) => a + b, 0) / reviews.length).toFixed(1)

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
    }
  }

  const handleBuyNow = () => {
    addToCart(product, qty)
    setShowCart(true)
  }

  return (
    <Layout categories={categories}>
      <div className='flex'>
        <div style={{'background' : `linear-gradient(to right,#f3daeb 57%,#fff 100%)`}} className='w-1/2 p-10'>
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
                {product.assets?.map((asset, id) => (
                  <SwiperSlide key={asset.id}>
                    <img className='w-3/4 m-auto' src={asset.url} alt={asset.name} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
        <div className='w-1/2 px-10 pt-10 bg-white'> 
          <h1 className='text-3xl'>{product.name}</h1>
          <h2 className='my-4 text-2xl'>{product.price.formatted_with_symbol}</h2>

          <span className='whitespace-pre-wrap'>{parse(productDescription)}</span>
          <div className="w-fit flex items-center my-4 bg-white border-2 border-gray-200">
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
        </div> 
      </div>
      <div className='bg-[#f3f8fe] pt-[40px] px-[3%]'>
        <div className='flex flex-col bg-white p-[20px]'>
          <h1 className='m-auto text-2xl'>Reviews</h1>
          <div>
            {reviewRatingsAvg > 0 ? reviewRatingsAvg : 0} out of 5 stars
            <ReactStars
              count={5}
              edit={false}
              value={reviewRatingsAvg}
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
                <div className='flex pt-[20px] pb-[10px] border-t-2 border-gray-200' key={review.id}>
                  <div className='justify-center w-1/4 text-center'>
                    <h1 >{review.name}</h1>
                    <div>
                      <ReactStars
                        classNames='m-auto'
                        count={5}
                        edit={false}
                        value={review.rating}
                        size={24}
                        activeColor="#86e1ff"
                      />
                    </div>
                  </div>
                  <p className='w-1/2 text-center'>{review.review}</p>
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
    </Layout>
  )
}

export default productDetails;

export async function getStaticProps({ params }) {
  // commerce.js
  const { permalink } = params;
  const { data: categories } = await commerce.categories.list();

  const product = await commerce.products.retrieve(permalink, {
    type: 'permalink',
  });

  const productDescription = product.description;

  //Firestore - Reviews
  let reviews = []

  const reviewsRef = collection(db, "productReviews", product.permalink, `${product.permalink}-reviews`);
  const querySnapshot = await getDocs(query(reviewsRef, orderBy('createdAt', 'asc')));

  querySnapshot.forEach((doc) => {
    reviews.push({...doc.data(), id: doc.id})
  })
  
  return {
    props: {
      product,
      categories,
      productDescription,
      reviews
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