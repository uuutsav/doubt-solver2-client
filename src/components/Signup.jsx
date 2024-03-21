import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';


const Signup = (onSignup) => {
  const [firstName, setfName] = useState('');
  const [lastName, setlName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('')
  const [email, setEmail] = useState('')
  const [strongSubject, setStrongSubject] = useState('')
  const [university, setUniversity] = useState('')
  const [password, setPassword] = useState('');
  const [course, setCourse] = useState('');
  const [branch, setBranch] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      let data = {
        firstName,
        lastName,
        mobileNumber,
        email,
        strongSubject,
        university,
        password,
        course,
        branch
      }
      console.log(strongSubject)

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      data = JSON.stringify(data)
      console.log(data)
      const response = await axios.post('http://localhost:5000/api/auth/signup', data, config);
      const { token } = response.data;
      console.log("Sent: ", response)
      // onSignup(token);
      navigate('/home')
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };


  return (
    <>
      <Navbar loggedIn={false} />
      <div className='container'>
        <div className='login__content'>
          <img src="/images/bg-login.png" className="login__img"></img>

          <form onSubmit={handleSignup} className="login__form">
            <div>
              <h1 className="login__title">
                <span>Welcome</span>
              </h1>
              <p className="login__description">
                {/* <!-- Login desc. --> */}

              </p>
            </div>

            <div>
              <label htmlFor="input-pass" className="login__label">Name</label>

              <input required
                id='input-fname'
                className='login__input'
                type="text"
                placeholder="First Name*"
                value={firstName}
                onChange={(e) => setfName(e.target.value)}
              />
              <input
                id='input-lname'
                className='login__input'
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setlName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="input-pass" className="login__label">Contact Details</label>

              <input
                className='login__input'
                id='input-phone'
                type="number"
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <input
                className='login__input'
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>

            <div>
              <label htmlFor="input-pass" className="login__label">Academic Details</label>

              <input
                required
                className='login__input'

                type="text"
                placeholder="Strong Subject*"
                value={strongSubject}
                onChange={(e) => setStrongSubject(e.target.value)}
              />
              <input
                className='login__input'

                type="text"
                placeholder="University Name"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              />
              <input
                className='login__input'

                type="text"
                placeholder="Course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              />
              <input
                className='login__input'

                type="text"
                placeholder="Branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="input-pass" className="login__label">Almost Done</label>

              <input
                className='login__input'

                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <button type='submit'
                className='login__button'>Signup</button>
            </div>

          </form>
        </div >
      </div >
    </>
  );
}

export default Signup
