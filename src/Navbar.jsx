import React from 'react'
import Logo from '../public/croplogo.png'

function Navbar() {
    return (
        <>
            <div className='text-white bg-cyan-950 py-2'>
                <nav className='flex items-center justify-between container uppercase'>
                    <div className="logo">
                        <img className='w-40 sm:w-52' src={Logo} alt="" />
                    </div>
                    <ul className='flex gap-4 sm:gap-8 text-[16px] sm:text-[19px]'>
                        <li className='hover:text-red-500 transition-all cursor-pointer'>Home</li>
                        <li className='hover:text-red-500 transition-all cursor-pointer'>My Tasks</li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Navbar
