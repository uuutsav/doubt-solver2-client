// show all the requests 

import React, { useEffect, useState } from 'react'
import './SolveRequests.css'

const tempArr = [{
  id: 1,
  image: '/images/dp.jpeg',
  username: 'ehe',
  name: 'hehe',
  title: 'Hehe ?',
  description: 'some hehe description here'
},
{
  id: 2,
  image: '/images/dp.jpeg',
  username: 'ehe',
  name: 'hehe',
  title: 'Hehe ?',
  description: 'some hehe description here'
},
{
  id: 1,
  image: '/images/dp.jpeg',
  username: 'ehe',
  name: 'hehe',
  title: 'Hehe ?',
  description: 'some hehe description here'
},
{
  id: 1,
  image: '/images/dp.jpeg',
  username: 'ehe',
  name: 'hehe',
  title: 'Hehe ?',
  description: 'some hehe description here'
}]

const SolveRequests = () => {
  const [requests, setRequests] = useState(tempArr)
  useEffect(() => {
    //api call here
  })

  return (
    <div className="popup">
      {requests.map(request => (
        <div key={request.id} className="question-container">

          <div className="image-container">
            <img src={request.image} alt="Question" />
          </div>
          <div className="content-container">
            <h3>{request.title}</h3>
            <p>{request.description}</p>
          </div>
          <div className='user-container'>
            <p>Asker: {request.name}<span> @{request.username}</span></p>

          </div>
        </div>
      ))}
    </div>
  )
}

export default SolveRequests
