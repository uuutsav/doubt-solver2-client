import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { isHamburgerActive } from '../../atoms/hamburgerAtom'

const Hamburger = () => {
    const [active, setActive] = useRecoilState(isHamburgerActive);
    const handleClick = () => {
        setActive(e => !e);
    }
    return (
        <div className='duration-150 cursor-pointer hover:scale-125' onClick={handleClick} >
            <div className={`1 bg-black h-1 w-8 m-1 ${active ? " rotate-45 translate-y-1 " : ""} `}></div>
            <div className={`2 bg-black h-1 w-8 m-1 ${active ? "hidden" : ""} `}></div>
            <div className={`3 bg-black h-1 w-8 m-1 ${active ? " -rotate-45 -translate-y-1" : ""} `}></div>
        </div>
    )
}

export default Hamburger