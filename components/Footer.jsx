import Link from 'next/link'
import React from 'react'
import Button from './Button'

const Footer = () => {
  return (
    <footer className='bg-[#c5c2d6] w-full max-w-[1600px] mx-auto flex flex-col md:flex-row'>
      <div className='justify-evenly flex flex-wrap order-2 w-full py-4'>
        <img className='md:w-[50px] h-fit m-auto order-2 md:order-1' src="/favicon.ico" alt="" />
        <div className='md:w-9/12 flex order-1 w-screen'>
          <div className='md:w-fit flex flex-col items-center m-auto'>
            <h1 className='text-xl'>Company</h1>
            <Link className='text-xs font-thin' href=''>Who we are</Link>
          </div>
          <div className='md:w-fit flex flex-col items-center m-auto'>
            <h1 className='text-xl'>Products</h1>
            <Link className='text-xs font-thin' href=''>Products</Link>
          </div>
        </div>
      </div>
      <div className='flex w-full md:max-w-[33%] bg-[yellow] order-1 md:order-2 py-4 items-center flex-col'>
        <h1 className='text-2xl'>Hear the Latest</h1>
        <p>New products, offers, and more</p>
        <input className=' w-10/12 py-2 my-2 text-center focus:outline-none focus:outline-[#cdc5fa] ' type='email' placeholder='Enter your email...' />
        <Button text='Subscribe' link='/' />
      </div>

    </footer>
  )
}

export default Footer