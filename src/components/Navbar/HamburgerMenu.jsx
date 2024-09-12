import React from 'react'
import { useRecoilValue } from 'recoil'
import { isHamburgerActive } from '../../atoms/hamburgerAtom';

const HamburgerMenu = () => {
    const isActive = useRecoilValue(isHamburgerActive);  

    return (
        <div className={`${isActive ? "flex" : "hidden"} bg-gray-200 w-[100vw] min-h-[20vh] duration-150 flex-col justify-evenly items-center text-3xl `}>
            <a href='#' className='p-3 duration-150 hover:scale-110'>Home</a>
            <a href='#' className='p-3 duration-150 hover:scale-110'>Feed</a>
            <a href='#' className='p-3 duration-150 hover:scale-110'>About</a>
        </div>
    )
}

export default HamburgerMenu