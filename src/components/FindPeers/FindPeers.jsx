import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './FindPeers.css'
import { useNavigate } from 'react-router-dom';

/*
(doubtID and QuestionID are used interchangebly)

1. Send question id to server
2. Server will find appropriate users and sends response
{
  id: ,
  name: ,

}
3. Take resonse arr and display them

Request Doubt
4. When clicked, send {
      userAsker: username,
      userSolver: username,
      doubtId: doubtID
    } 
    to server.
5. Change 'Button text to loader'
6. Get response from server if the reqeuest is sent or not sent, then change button text accordingly(button text state needs to be in a array)
*/

const tempArr = [{
  dp: '/images/dp.jpeg',
  name: 'Hehe',
  description: "This guy just HEHEd the whole code as if it's a monosyllable.",
  cgpa: "",
  university: ""
},
{
  dp: 'https://i.pinimg.com/736x/eb/ee/03/ebee037eba08e25d5920ee10d4c2d76d.jpg',
  name: 'Not Hehe',
  description: "This guy cannot HEHE the whole code as if it's a monosyllable."
},]

const FindPeers = ({ togglePopupFindPeer, togglePopupAsk, questionID, username }) => {
  // const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [buttonTexts, setButtonTexts] = useState([]);

  const [serverResponse, setServerResponse] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    // 1. Send question id to server
    // 2. Server will find appropriate users and sends response
    // console.log("QUestion ID: ", questionID)

    try {
      let data = {
        questionID: questionID
      }
      const getResponse = async () => {
        const response = await axios.post('http://localhost:5000/api/ask/solverslist', data)
        data = response.data;
        setServerResponse(true)

        if (data.status == true) {
          setUsers(data.users);
          //5.
          const arr = []
          for (let i = 0; i < users.length; i++) {
            arr.push("Request Doubt")
          }
          console.log("Button array ", arr)
          setButtonTexts(arr);

        } else {
          console.log("Server cannot send users data")
          setUsers(tempArr)
        }
      }
      getResponse();

    } catch (error) {
      console.log("Axios Error: ")
    }
  }, [serverResponse])

  const handleRequestDoubt = async (index) => {
    // 4.
    let data = {
      userAsker: username,
      userSolver: users[index].id,
      questionID: questionID
    }

    try {
      const response = await axios.post('http://localhost:5000/api/handleDoubtRequest', data);
      data = response.data
      //5. 
      setButtonTexts(prevButtonTexts => {
        const newArray = [...prevButtonTexts];
        // Update the value at the specified index
        newArray[index] = "...";
        return newArray;
      });
      if (data.status == true) {
        // 5.
        setButtonTexts(prevButtonTexts => {
          const newArray = [...prevButtonTexts];
          // Update the value at the specified index
          newArray[index] = "Sent";
          return newArray;
        });
      } else {
        // 5. failed
        console.log("Doubt Request failed: ", data)
        setButtonTexts(prevButtonTexts => {
          const newArray = [...prevButtonTexts];
          // Update the value at the specified index
          newArray[index] = "Request Doubt";
          return newArray;
        });
      }

    } catch (error) {
      console.log("Error: ", error)
    }
  }

  const handleFindPeerDone = () => {
    togglePopupFindPeer();
  }

  // newtonsCradle.register();
  return (
    <div className="popup">
      <h2 className='popup-title'>Find peers to solve doubt with</h2>
      <div className='popup-body'>
        <div className="user-grid">
          {users.map((user, index) => (
            <div key={index} className="user-item">
              <div className='dp-div'>
                <img src={user.dp} alt='not heheing' className="user-dp" />
              </div>
              <div className="user-info">
                <h3>{user.name}</h3>
                <p>{user.description}</p>
                <h3>CGPA: {user.cgpa}</h3>
                <h4>University: {user.university}</h4>
              </div>
              {/* {console.log(buttonTexts)} */}
              <button className='request-button' onClick={() => {
                handleRequestDoubt(index)
              }}>{buttonTexts[index]}</button>
            </div>
          ))}
        </div>
        <div className='btn-div'>
          <button onClick={handleFindPeerDone} className='btn-done'>Done</button>
        </div>
      </div>

    </div>
  )
}

export default FindPeers
