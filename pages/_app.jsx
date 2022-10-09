import '../styles/globals.css'
import { StateContext } from '../context/StateContext'
import { Toaster } from 'react-hot-toast'
import Layout from '../components/Layout'
import { commerce } from '../lib/commerce'
// import "../styles/slick.css"; 

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Toaster />
        <Component {...pageProps} />
    </StateContext>
  )
}

export default MyApp
