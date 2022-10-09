import NavBar from './NavBar'
import Head from 'next/head'
import Footer from './Footer'

const Layout = ({children, categories}) => {
  return (
    <div className='overflow-hidden h-full px-4 bg-gradient-to-b from-red-300 to-red-500 to-blue-900 font-["Montserrat"]'>
      <Head>
        <title>Astro Luz</title>
      </Head> 
      <NavBar categories={categories} />
      <main className='max-w-[1600px] min-h-screen m-auto'>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout