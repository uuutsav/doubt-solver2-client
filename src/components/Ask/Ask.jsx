/*
 TODO: Put transition and ease in popup
 TODO: Put in loaders.
*/

import React, { useEffect, useState } from 'react'
import './Ask.css'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const doubtCategories = ["Basic Question", "One Topic", "Full Chapter"]

const Ask = ({subjects, subject, subjectIDs, subjectId, setSubject, setSubjectId, setDoubtId, togglePopupAsk, togglePopupFindPeer}) => {
  const [headign, setHeading] = useState("Ask a question")
  const [category, setCategory] = useState('Question')
  const [subjectIndex, setSubjectIndex] = useState('')
  const [questionBody, setQuestionBody] = useState('')
  const [file, setFile] = useState(null)

  useEffect(() => {
    // console.log(subjects)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token)

      const sID = subjectIDs[subjectIndex];
      setSubjectId(sID)
      console.log(typeof sID)

      const data = {
        userId: decodedToken.id.id,
        subjectId: sID,
        doubtType: category,
        question: questionBody,
        file: file
      }
      console.log(data)

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
      console.log("Ask response: ", response.data);

      if (response.data.status == true) {
        const dID = response.data.doubtId;
        setDoubtId(dID); 
        // console.log("Received doubt ID: ", dID)

        togglePopupAsk();
        togglePopupFindPeer();
        
      } else {
        console.log("Database Error ")
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
          setSubject(e.target.value)
          setSubjectIndex(subjects.indexOf(e.target.value))
          // props.setSubjectId(subject.indexOf(e.target.value))
        }} className='bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-12 text-lg' >
          <option value="">Subject</option>

          {subjects.map((option, index) => (
            <option key={index} value={option}>{option}
            </option>
          ))}
          {/* <option value="other">Other</option> */}
        </select>

        <label htmlFor="category">Select Doubt Category:</label>
        <select id="category" name="category" onChange={(e) => {
          setCategory(e.target.value)
        }} className='bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-12 text-lg'>
          <option value="">Doubt Category</option>

          {doubtCategories.map((option, index) => (
            <option key={index} value={option}>{option}
            </option>
          ))}

          {/* <option value="other">Other</option> */}
        </select>

        <label htmlFor="question">Describe your doubt:</label>
        {/* <input type="text" id="question" name="question" /> */}
        <textarea name='text-area' rows="5" id='question' onChange={(e) => {
          setQuestionBody(e.target.value)
        }} className='block p-5 w-full text-lg text-gray-500 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'></textarea>

        <label htmlFor="file">Upload Doubt Image:</label>
        <input type="file" id="file" name="file" onChange={(e) => {
          setFile(e.target.files[0])
        }} className='block h-11 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'/>


        <button type="submit" className='submit-button '>Find Peers</button>
        
      </form>
    </div>
  );
}

export default Ask
