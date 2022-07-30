import React from 'react'

const NavBar = ({categories}) => {
  return (
    <nav className={`flex px-2 group z-50 border-b-2 border-gray-700 bg-transparent hover:text-black hover:bg-[#c6c3d6] transition-[background] duration-500 relative`}>
      <div>
        <a href='/' className={`flex items-center justify-center px-2 py-2 text-black hover:text-black hover:bg-[#c6c3d6] transition-[background] duration-500`}>
          Products
        </a>
      </div>
      <div className="absolute bg-[gray] w-screen left-0 flex top-[100%] flex-wrap items-center justify-between mx-auto">
        {categories.map(category => (
          <div  className='flex flex-col'>
            <a className='text-blue-500 hover:text-blue-700 px-4 py-2' href={`/products/`}>
              {category.name}
            </a>
            {category.children.map(child => (
              <a className='text-blue-500 hover:text-blue-700 px-4 py-2' href={`/products/`}>
                {child.name}
              </a>
            ))}
          </div>
        ))}
      </div>
    </nav>
  )
}

export default NavBar