import Link from 'next/link';
import React, { useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping, } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { useStateContext } from '../context/StateContext';
import Cart from './Cart'


const NavBar = ({ categories }) => {

  const [active, setActive] = useState(false);
  const [mobSlider, setMobSlider] = useState(false);
  const [mobileNav,  setMobileNav] = useState(false);
  const [subMenu, setSubMenu] = useState(false);
  const { totalPrice, totalQuantity, cartItems, setShowCart, updateCartItemQty, removeFromCart, showCart } = useStateContext()

  return (
    <nav className='w-full max-w-[1600px] mx-auto relative max-h-[10vh] z-100 bg-[#c6c3d6]'>
      <div className='flex px-2 group justify-between max-w-[1200px] mx-auto z-50 bg-transparent hover:text-black'>
        <Link href='/'>
          <button>
            <img className='md:order-1 order-2' src="/favicon.ico" alt="" />
          </button>
        </Link>
        <div className='md:flex order-1 hidden gap-6 py-3 m-auto'>
          <a onMouseOver={()=> {setActive(true)}} className={`flex items-center justify-center text-lg px-2 py-2 text-black hover:text-black `}>
            Products
          </a>
          <a href='/about' onMouseOver={()=> setActive(false)} className={`flex items-center justify-center text-lg px-2 py-2 text-black hover:text-black `}>
            About
          </a>
          <a href='/about' onMouseOver={()=> setActive(false)} className={`flex items-center justify-center text-lg px-2 py-2 text-black hover:text-black `}>
            Contact
          </a>
        </div>

        <div className="flex order-2">
          <div className='h-fit flex mx-2 my-auto'>
            <Cart  />
            <button type='button' className={`text-[25px] group-hover:text-black cursor-pointer relative scale-100 hover:scale-110 bg-transparent border-none`} onClick={() => setShowCart(!showCart)}>
                <AiOutlineShopping />
                <span className='absolute top-0 -right-[8px] text-white bg-[#f02d34] w-4 h-4 text-[12px] rounded-[50%]'>{totalQuantity}</span>
            </button>
          </div>
        </div>

        <div onMouseLeave={() => setActive(false)} className={`${active ? 'block' : 'hidden'} absolute bg-[#c6c3d6] w-full z-[100] py-4 left-0 gap-10 flex top-[100%] flex-wrap justify-center mx-auto`}>
          {categories?.map((category, id) => (
            <div key={id} className='flex flex-col'>
              {(category.name ==  'Crystals' || category.name == 'Candles') && (
                <h1 className='underline-offset-4 mb-2 text-lg text-gray-500 underline'>
                  {category.name}
                </h1>
              )}
              {category.children.map((child, id) => (
                <a key={id} href={`/subcategories/${child.slug}`} className='hover:text-[#853e95] hover:underline py-[4px] text-sm text-gray-800'>
                  {child.name}
                </a>
              ))}
            </div>
          ))}
          {categories?.map((category) => category.children.map((child, id) => (
            child.assets.length > 0 && (
              <a key={id} href={`/categories/${category.slug}`} className=' pt-4 text-sm text-gray-800'>
                <img className='w-[120px]' src={child.assets[0]?.url} alt="" />
              </a>
            ))
          ))}
        </div>

        <button onClick={() => setMobileNav(!mobileNav)}  type="button" className="md:hidden focus:outline-none inline-flex items-center p-2 mx-2 text-sm text-gray-500 rounded-lg" >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </button>

        <div className={`${mobileNav ? 'left-0' : '-left-[100%]'} md:hidden transition-all duration-300 fixed uppercase font-light h-screen ease-in-out w-screen z-[100] text-white tracking-[0.2rem]`} >
          {/* Closes modal when user clicks outside of the mobile navigation */}
          <div onClick={() => setMobileNav(false)} className='absolute top-0 right-0 w-3/12 h-screen bg-transparent' />
          <div className='absolute z-20 min-h-screen w-3/4 bg-[#1c1b1b]'>
            <button onClick={() => setMobileNav(false)} className='right-5 top-6 absolute'>X</button>
            <ul className="nav-categories h-fit md:h-full flex flex-col mt-10 ml-10">
              <li className='border-slate-500 flex flex-col w-11/12 h-full py-3 text-white border-b-2'>
                <h1  onClick={() => setMobSlider(!mobSlider)} className="h-fit flex items-center justify-between py-2 pl-3 pr-4 text-lg rounded-lg">
                    Products
                    <div className={`circle-plus ${mobSlider ? 'opened' : 'closed'} flex justify-end h-fit`}>
                      <div className="circle">
                        <div className="horizontal"></div>
                        <div className="vertical"></div>
                      </div>
                    </div>
                </h1>
                <div className={`justify-center border-l-2  overflow-hidden ml-6 flex flex-wrap m-auto ${mobSlider ? 'max-h-[2000px] visible transition-all border-gray-700 duration-1000 linear' : 'max-h-0  invisible transition-all duration-[700ms] linear'}`} >
                  {categories?.map((category, id) => (
                    <div key={id} className='flex flex-col w-full mx-6 text-left border-b-2 border-gray-700'>
                      <h2 onClick={ () => setSubMenu({...subMenu, [id]: !subMenu[id]}) } className='flex justify-between items-center py-6 text-sm tracking-[0.2em] text-[#ffffff7f] uppercase'>
                        {category.name}
                        {category.children.length > 0 && (
                          <div className={`circle-plus ${subMenu[id] ? 'opened' : 'closed'} flex justify-end h-fit`}>
                            <div className="circle">
                              <div className="horizontal"></div>
                              <div className="vertical"></div>
                            </div>
                          </div>
                        )}
                      </h2>
                      <div className={`pl-4 ml-3 flex overflow-hidden flex-col ${subMenu[id] ? 'mb-6 border-l-2 border-gray-600 max-h-96 leading-[100px] visible transition-all duration-500 ease-in-out' : 'border-l-2 max-h-0 leading-0 invisible transition-all duration-500 ease-in-out'} `}>
                        {category.children.map((child, id) => (
                          <Link key={id} href={`/product/${child.slug}`}>
                            <a index={id} className='hover:underline my-1 text-base font-normal'>{child.name}</a>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </li>
              <li className='border-slate-500 flex flex-col w-11/12 h-full py-3 text-white border-b-2'>
                <h1 className="h-fit flex items-center justify-between py-2 pl-3 pr-4 text-lg rounded-lg">
                  About
                </h1>
              </li>
              <li className='border-slate-500 flex flex-col w-11/12 h-full py-3 text-white border-b-2'>
                <h1 className="h-fit flex items-center justify-between py-2 pl-3 pr-4 text-lg rounded-lg">
                  Contact
                </h1>
              </li>
            </ul>
          </div>                    
        </div>
      </div>
    </nav>
  )
}

export default NavBar