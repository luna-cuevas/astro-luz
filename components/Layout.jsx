import React from 'react'
import NavBar from './NavBar'
import Head from 'next/head'

const Layout = ({children, products, categories}) => {
  return (
    <div className='overflow-hidden font-["Montserrat"]'>
      <Head>
        <title>Astro Luz</title>
      </Head> 
      <NavBar categories={categories} />
      <main>
        {children}  
      </main>
      <footer>
        {/* <Footer /> */}
      </footer>
    </div>
  )
}

export default Layout