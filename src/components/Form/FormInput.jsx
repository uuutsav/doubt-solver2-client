import React from 'react'

const FormInput = ({type, placeholder, onChange}) => {
    return (
        <div className='p-3 my-3 bg-white rounded-full duration-150 hover:scale-105'>
            <input type={type} placeholder={placeholder} className='p-1 outline-none ' onChange={(e) => onChange(e.target.value)} ></input>
        </div>
    )
}

export default FormInput