// show all the requests 

import React, { useEffect, useState } from 'react'
import './SolveRequests.css'
import axios from 'axios'

/*
1. Fetch all requests
2. When clicked 'accept', send data to backend
3. if response status = true
4. navigate to /chat

{ 
  id: 'question id,
  image: 'img url,
  title: 'qn title',
  description: 'qn description',
  name: 'jo banda question poocha uska naam',
  username: 'bande ka naam'
}
*/

const SolveRequests = () => {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    // 1
    let data = {}

    const getAllRequests = async () => {
      const response = await axios.get('http://localhost:5000/api/getRequests')
      data = response.data;

      console.log(response.data)
      setRequests(data.requests)
    }

    try {
      getAllRequests();

    }catch(error) {
      console.log("error: ", error)
    }
  }, [])


  const handleAcceptRequest = () => {
    const data = {
      id: 'question id',
      username: 'request karne wale ka username'
    }
    const response = axios.get('http://localhost:5000/api/acceptDoubtRequest')

    // logic to accept connection and navigate to /chat
  }
  return (
    <div className="popup">
      {requests.map(request => (
        <div key={request.id} >
        <div className="question-container">

          <div className="image-container">
            <img src={request.image} alt="Question" />
          </div>
          <div className="content-container">
            <h3>{request.title}</h3>
            <p>{request.description}</p>
          </div>
          <div className='user-container'>
            <p>Asker: {request.name}<span> @{request.username}</span></p>
            <button>Accept Doubt</button>
          </div>
        </div>
        <hr className='hr' />
        </div>
      ))}
    </div>
  )
}

export default SolveRequests
