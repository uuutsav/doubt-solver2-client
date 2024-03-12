/*
 TODO: Put transition and ease in popup
 
*/

import React, { useEffect, useState } from 'react'
import './Ask.css'
import axios from 'axios';

const Ask = (props) => {
  const [category, setCategory] = useState('Question')
  const [subject, setSubject] = useState('')
  const [questionBody, setQuestionBody] = useState('')
  const [file, setFile] = useState(null)
  // useEffect(() => {
  //   console.log(subject)
  // }, [subject, category])

  const doubtCategories = ["Basic Question", "One Topic", "Full Chapter"]
  const subjects = ["HPC", "CN", "OS"]

  const [isQuestion, setIsQuestion] = useState(true)
  const [isTopic, setIsTopic] = useState(false)
  const [isChapter, setIsChapter] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      subject: subject,
      doubtType: category,
      questionBody: questionBody,
      file: file
    }
    console.log(data)
    console.log("Prop: ", props.togglePopupAsk)

    
    try{
      const response = await axios.post('/api/ask', data);
      setTimeout(() => {
        props.togglePopupAsk();
      }, 1000);
  
    } catch(error){
      console.log("Error axios")
    }

  }

  return (
    <div className="popup">
      <h2>Ask a Question</h2>
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
        }}/>


        <button type="submit" className='submit-button'>Find Peers</button>
      </form>
    </div>
  );
}

export default Ask
