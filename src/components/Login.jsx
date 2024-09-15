// Login.jsx
import React, { useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import FormInput from './Form/FormInput';

const Login = ({ }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    loginUser({ email: email, password: password })
    setTimeout(() => {
      navigate('/home')
    }, 500)
  };

  return (
    <div>
      <Navbar />
      <div className="container bg-gray-200 h-[100vh] min-w-[100vw] flex flex-col gap-[10vw] lg:flex-row items-center">
        <div className='flex flex-col flex-1 justify-center items-center lg:items-end p-3'>
          <form onSubmit={handleLogin} className='flex flex-col items-center'>
            <h2 className='text-3xl font-semibold'>Log In</h2>
            <FormInput type={'email'} placeholder={'Email'} onChange={(e) => {
              setEmail(e);
            }} />
            <FormInput type={'password'} placeholder={'Password'} onChange={(e) => {
              setPassword(e);
            }} />
            <button type='submit' className='bg-green-300 px-5 py-3 my-3 rounded-full hover:scale-110 duration-150' >
              Signup
            </button>
            <div className='my-3 cursor-pointer hover:underline' onClick={() => { navigate('/signup') }} >Don't have an account?</div>
          </form>
        </div>
        <div className='flex-1  px-3 overflow-hidden object-fill '>
          <img src="/images/thinking.png" alt="" className='h-full lg:max-h-[50vh] ' />
        </div>
      </div>
    </div>
  );
};

export default Login;
