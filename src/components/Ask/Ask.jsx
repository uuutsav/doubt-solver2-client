/*
 TODO: Put transition and ease in popup
 TODO: Put in loaders.
*/

import React, { useEffect, useState } from 'react'
import './Ask.css'
import axios from 'axios';

const Ask = (props) => {
  const [headign, setHeading] = useState("Ask a question")
  const [category, setCategory] = useState('Question')
  const [subject, setSubject] = useState('')
  const [questionBody, setQuestionBody] = useState('')
  const [file, setFile] = useState(null)

  // const [questionID, setQuestionID] = useState('')

  const doubtCategories = ["Basic Question", "One Topic", "Full Chapter"]
  const subjects = ["HPC", "CN", "OS"]

  // const [isQuestion, setIsQuestion] = useState(true)
  // const [isTopic, setIsTopic] = useState(false)
  // const [isChapter, setIsChapter] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      subject: subject,
      doubtType: category,
      questionBody: questionBody,
      file: file
    }
    // console.log(data)

    // send formdata to server
    try {
      const response = await axios.post('http://localhost:5000/api/ask', data);

      /*

      const token = localStorage.getItem('token');
      if (!token){
        // navigate to /login
      }
      const response = await axios.post('http://localhost:5000/api/ask', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      */
      // console.log("Ask response: ", response.data);

      if (response.data.status == true) {
        props.setQuestionID(response.data.questionID); // this takes smol time to update
        console.log("Question ID: ", props.questionID);

        // turn off the popups
        props.togglePopupAsk();
        props.togglePopupFindPeer();

      } else {
        console.log("Database Error ")
        // try again
        setHeading("Oops! Something went wrong. Please try again")
      }

    } catch (error) {
      console.log("Error axios: ", error)
      setHeading("Oops! Server is not responding. Please try again later")
    }
  }

  return (
    <div className="popup">
      <h2>{headign}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="subject">Select Subject:</label>
        <select id="subject" name="subject" onChange={(e) => {
          // console.log(e.target.value)
          setSubject(e.target.value)
        }}>
          <option value="">Select a Subject</option>

          {subjects.map((option, index) => (
            <option key={index} value={option}>{option}
            </option>
          ))}
          <option value="other">Other</option>
        </select>

        <label htmlFor="category">Select Doubt Category:</label>
        <select id="category" name="category" onChange={(e) => {
          setCategory(e.target.value)
        }}>
          <option value="">Doubt Category</option>

          {doubtCategories.map((option, index) => (
            <option key={index} value={option}>{option}
            </option>
          ))}

          <option value="other">Other</option>
        </select>

        <label htmlFor="question">Describe your doubt:</label>
        {/* <input type="text" id="question" name="question" /> */}
        <textarea name='text-area' rows="5" id='question' onChange={(e) => {
          setQuestionBody(e.target.value)
        }}></textarea>

        <label htmlFor="file">Upload Doubt Image:</label>
        <input type="file" id="file" name="file" onChange={(e) => {
          setFile(e.target.files[0])
        }} />


        <button type="submit" className='submit-button'>Find Peers</button>
      </form>
    </div>
  );
}

export default Ask
