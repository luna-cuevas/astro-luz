import Link from 'next/link'
import React from 'react'

const Button = ({text, link}) => {
  return (
    <Link href={link} className=''>
      <button className='bg-[#8cd0e3] uppercase transition-all duration-300 text-white w-fit px-4 py-2 hover:shadow-[3px_3px_0_#f5ea77]'>
        {text}
      </button>
    </Link>
  )
}

export default Button