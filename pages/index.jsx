import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { commerce } from '../lib/commerce'


const Home = ({products, categories}) => {

  return (
    <Layout categories={categories}>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
            
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
