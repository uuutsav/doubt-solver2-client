/*
 TODO: Put transition and ease in popup
 TODO: Put in loaders.
*/

import React, { useEffect, useState } from 'react'
import './Ask.css'
import axios from 'axios';

let subjects = []

const Ask = (props) => {
  const [headign, setHeading] = useState("Ask a question")
  const [category, setCategory] = useState('Question')
  const [subject, setSubject] = useState('')
  const [subjectIndex, setSubjectIndex] = useState('')
  const [questionBody, setQuestionBody] = useState('')
  const [file, setFile] = useState(null)

  // const [questionID, setQuestionID] = useState('')
  useEffect(() => {
    subjects = props.subjects;
    console.log(subjects)
  }, [])

  const doubtCategories = ["Basic Question", "One Topic", "Full Chapter"]
  // const subjectIDs = props.subjectIDs;

  // const [isQuestion, setIsQuestion] = useState(true)
  // const [isTopic, setIsTopic] = useState(false)
  // const [isChapter, setIsChapter] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubjectIndex(subjects.indexOf(subject))

    const data = {
      askerUserId: props.userID,
      subjectId: subject,

      doubtType: category,
      question: questionBody,
      file: file
    }
    // console.log(data)

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      };

      if (!token) {
        // navigate to /login
      }
      const response = await axios.post('http://localhost:5000/api/doubt/ask', data, config);


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
