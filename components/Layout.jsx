import React from 'react'
import NavBar from './NavBar'
import Head from 'next/head'

const Layout = ({children, products, categories}) => {
  return (
    <div className='overflow-hidden bg-gradient-to-b from-red-300 to-red-500 to-blue-900 font-["Montserrat"]'>
      <Head>
        <title>Astro Luz</title>
      </Head> 
      <NavBar categories={categories} />
      <main className='max-w-[1600px] m-auto'>
        {children}
      </main>
      <footer>
        {/* <Footer /> */}
      </footer>
    </div>
  )
}

export default Layout