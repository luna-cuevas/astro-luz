import '../styles/globals.css'
import { StateContext } from '../context/StateContext'
import { Toaster } from 'react-hot-toast'
// import "../styles/slick.css"; 

function MyApp({ Component, pageProps, categories }) {
  return (
    <StateContext>
        <Toaster />
        <Component {...pageProps} />
    </StateContext>
  )
}

export default MyApp
