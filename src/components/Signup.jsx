import React, { useEffect } from 'react'
import { useState } from 'react'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import FormInput from './Form/FormInput';
import { useAuth } from '../hooks/useAuth';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../recoil/atoms/authAtom';


const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [submit, setSubmit] = useState(false);

  const { registerUser } = useAuth();
  const authState = useRecoilValue(authAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (submit && authState.isAuthenticated) {
      setTimeout(() => {
        navigate('/home')
      }, 500);
    }
  }, [submit])

  const handleSignup = async (e) => {
    e.preventDefault();

    let credentials = {
      name,
      email,
      password,
    }
    console.log("Credentials: ", credentials);
    registerUser(credentials);
    setSubmit(true);
  };


  return (
    <>
      <Navbar />
      <div className="signup min-h-[100vh] min-w-[100vw] bg-gray-200 flex flex-col gap-[10vw] items-center lg:flex-row">
        <div className="form flex-1 flex justify-end ">
          <form onSubmit={handleSignup} className="form flex flex-col  items-center">
            <h2 className='text-3xl font-semibold'>Welcome</h2>
            <FormInput placeholder={"Full Name"} type={"text"} onChange={e => setName(e)} />
            <FormInput placeholder={"E-mail - [user@kiit.ac.in]"} type={"email"} onChange={e => setEmail(e)} />
            <FormInput placeholder={"Set Password"} type={"password"} onChange={e => setPassword(e)} />

            <button className='bg-green-300 lg:max-w-[30vw] p-4 m-4 rounded-full duration-150 hover:scale-110' >Create Account</button>

            {(submit && authState.isAuthenticated) && <h3 className='text-green-400'>Registraton Successful</h3>}
            {(submit && !authState.isAuthenticated) && <h3 className='text-red-400'>Registraton Failed</h3>}

            <div className='my-3 cursor-pointer hover:underline' onClick={() => { navigate('/login') }} >Already have an account?</div>

          </form>
        </div>
        <div className='image-container flex-1  px-3 overflow-hidden object-fill '>
          <img src="/images/thinking.png" alt="" className='h-full lg:max-h-[50vh] ' />
        </div>
      </div>
    </>
  );
}

export default Signup
