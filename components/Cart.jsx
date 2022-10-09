import React, {useRef} from 'react'
import Link from 'next/link'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping, } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import toast from 'react-hot-toast'
import { useStateContext } from '../context/StateContext'
// import { urlFor } from '../lib/client'

const Cart = () => {
  const cartRef = useRef()
  const { totalPrice, totalQuantity, cartItems, setShowCart, updateCartItemQty, removeFromCart, showCart } = useStateContext()

  return (
    <div className={`${showCart ? 'right-0' : 'right-[-100%]'} text-white z-[100] w-screen md:w-fit fixed top-0 transition-all duration-500 ease-in-out`} ref={cartRef}>
      {/* Created an underlay? that sits under the cart menu. If user clicks outside cart, cart modal closes */}
      <div onClick={() => setShowCart(false)} className='absolute top-0 left-0 w-screen h-screen bg-transparent'></div>
      <div className={`h-screen w-10/12 md:w-[600px] right-0 bg-[#1c1b1b] md:py-[40px] md:px-[10px] p-1 absolute`}>
        <button type='button' className='mt-[35px] md:mt-0 flex items-center font-[18px] cursor-pointer gap-[2px] ml-[10px] border-none bg-transparent' onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className='ml-[10px]'>Your Cart</span>
          <span className='ml-[10px] text-[#f02d34]'>{totalQuantity} items</span>
        </button>
        {/* Cart Empty */}
        {cartItems.length < 1 && (
          <div className='m-10 text-center'>
            <AiOutlineShopping className='m-auto' size={150} />
            <h3 className='font-bold text-[20px]'>Your shopping bag is empty</h3>
            <Link href='/'>
              <button
                type='button'
                onClick={() => setShowCart(false)}
                className='bg-[#745da7] w-full py-[14px] px-[28px] hover:scale-110 transition-all duration-300 rounded-xl mt-10 md:max-w-[350px]'
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        {/* Cart Items Present */}
        <div className='max-h-3/4 md:mt-3 px-2 py-5 mt-2 text-white'>
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className='flex gap-[30px] p-5' key={item._id}>
              <img src='' className='h-1/4 w-1/4 md:h-[150px] md:w-[180px] bg-[#ebebeb] rounded-2xl' alt="" />
              <div className='justify-evenly h-fit flex flex-col'>
                <div className='flex justify-between w-[200px] md:w-[300px] text-white'>
                    <h5 className=''>
                      {item.name}
                    </h5>
                    <h4>$ {item.price}</h4>
                </div>
                <div className='flex mt-[30px] justify-between md:mt-[60px]'>
                  <div>
                    <p className="w-fit  border-[1px] p-1.5 text-base border-gray-200 flex">
                      <button className="md:py-2.5 md:px-3 px-2 cursor-pointer m-auto text-[#f02d34]" onClick={() => updateCartItemQty(item._id, 'decrement')}><AiOutlineMinus /></button>
                      <span className="md:px-3 md:py-3 px-2 m-auto cursor-pointer">{item.quantity}</span>
                      <button className="md:py-2.5 md:px-3 px-2 cursor-pointer m-auto text-[#0f7121]" onClick={() => updateCartItemQty(item._id, 'increment')}><AiOutlinePlus /></button>
                    </p>
                  </div>
                  <button type='button' className='text-[24px] text-[#f02d34] cursor-pointer bg-transparent' onClick={() => removeFromCart(item)}>
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Order Details */}
        {cartItems.length >= 1 && (
          <div className='absolute bottom-3 right-1 w-full p-7 md:py-7 md:px-[65px]'>
            <div className='flex justify-between text-[22px]'>
              <h3>Subtotal: </h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className='flex m-auto'>
              <button type='button'
                className='bg-[#745da7] w-full py-[14px] px-[28px] hover:scale-110 m-auto transition-all duration-300 rounded-xl mt-10 md:max-w-[350px]' 
                // onClick={handleCheckout}
              >
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart