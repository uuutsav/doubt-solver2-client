// Home.jsx
import React, { useEffect, useState } from 'react';
import Ask from './Ask/Ask';
import FindPeers from './FindPeers/FindPeers';
import SolveRequests from './SolveRequests/SolveRequests';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Home = ({ }) => {
    const [showPopupAsk, setShowPopupAsk] = useState(false);
    const [showPopupFindPeer, setShowPopupFindPeer] = useState(false);
    const [showPopupSolve, setShowPopupSolve] = useState(false)
    const [showLoader, setShowLoader] = useState(false)

    const [doubtId, setDoubtId] = useState('')

    const [subjects, setSubjects] = useState([]);
    const [subject, setSubject] = useState('')
    const [subjectIDs, setSubjectIDs] = useState([]);
    const [subjectId, setSubjectId] = useState('')

    useEffect(() => {

    }, [])


    const togglePopupAsk = async () => {
        // console.log("Toggled  togglePopupAsk")
        setShowLoader(false)
        setShowPopupFindPeer(false)
        setShowPopupSolve(false)

        await getSubjects()

        setShowPopupAsk(!showPopupAsk);
        // setShowLoader(!showLoader)

    };
    const togglePopupFindPeer = () => {
        // console.log("Toggled ")
        setShowLoader(false)
        setShowPopupSolve(false)
        setShowPopupAsk(false);
        setShowPopupFindPeer(!showPopupFindPeer)
    }
    const togglePopupSolve = () => {
        // console.log("Toggled solve")
        setShowPopupFindPeer(false)
        setShowLoader(false)
        setShowPopupAsk(false)
        setShowPopupSolve(!showPopupSolve)
    }
    const toggleLoader = () => {
        setShowLoader(!showLoader)
    }

    const getSubjects = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/subject/all")
            const arr = response.data.subjects;
            // console.log(arr)

            const tempSub = [];
            const tempSubIDs = [];
            arr.map((value, index) => {
                tempSub[index] = value.description;
                tempSubIDs[index] = value._id;
            })
            setSubjects(tempSub)
            setSubjectIDs(tempSubIDs)
            // console.log(subjects)
        } catch (error) {
            console.log("Error getting subject list: ", error)
        }
    }


    return (
        <div className='hero p-3 md:px-[8vw] lg:px-[15vw] min-h-[93vh] bg-gray-200 flex flex-col md:flex-row'>
            <div className='left-parent lg:w-1/2 flex flex-col justify-center '>
                <h1 className='text-6xl lg:text-9xl text-blue-900 font-bold z-50 '>
                    Doubt Comm<span className='text-green-300'>unity</span>
                </h1>
                <h2 className='text-4xl font-semibold my-3 text-blue-900'>
                    Ask doubts, get answers, and grow within your college community.
                </h2>
                <hr className='h-2 w-1/5 my-8 bg-blue-900'></hr>
                <p className='text-xl my-5 '>
                    Post questions, resolve doubts and publish findings in and around your college.
                    Engage in meaningfull discussions and build strong, inclusive connctions within your college community.
                </p>
                <div className="buttons my-5 flex gap-5 ">
                    <div
                        className='px-8 py-5 text-2xl md:text-3xl text-center bg-green-300 rounded-full cursor-pointer duration-150 hover:scale-110 '
                        onClick={togglePopupAsk}>
                        Ask a Doubt
                    </div>
                    <div className='px-8 py-5 border-2 text-2xl md:text-3xl text-cen border-green-300 rounded-full cursor-pointer duration-150 hover:scale-110'
                        onClick={togglePopupSolve}>
                        Solve Doubts
                    </div>
                </div>
                <div className="socials mt-8 px-2 text-4xl flex gap-5  ">
                    <a
                        href="http://www.linkedin.com/in/kumar-utsav-638914239/"
                        target='_blank'
                        className='cursor-pointer duration-150 hover:scale-125'
                    >
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a
                        href="https://github.com/uuutsav//"
                        target='_blank'
                        className='cursor-pointer duration-150 hover:scale-125'
                    >
                        <FontAwesomeIcon icon={faGithub} />
                    </a>

                </div>
            </div>
            <div className='right-parent w-1/2 hidden md:flex items-center'>
                <div className='p-5' >
                    <img src='./images/thinking_transparent.png' className='w-full' ></img>
                </div>
                {showPopupAsk && <Ask subjects={subjects} subject={subject} setSubject={setSubject} subjectIDs={subjectIDs} subjectId={subjectId} setSubjectId={setSubjectId} doubtId={doubtId} setDoubtId={setDoubtId} togglePopupAsk={togglePopupAsk} togglePopupFindPeer={togglePopupFindPeer} togglePopupSolve={togglePopupSolve} />}

                {showPopupFindPeer && <FindPeers subjects={subjects} subject={subject} setSubject={setSubject} subjectIDs={subjectIDs} subjectId={subjectId} setSubjectId={setSubjectId} doubtId={doubtId} setDoubtId={setDoubtId} togglePopupAsk={togglePopupAsk} togglePopupFindPeer={togglePopupFindPeer} togglePopupSolve={togglePopupSolve} />}

                {showPopupSolve && <SolveRequests togglePopupAsk={togglePopupAsk} togglePopupFindPeer={togglePopupFindPeer} togglePopupSolve={togglePopupSolve} />}
            </div>
        </div>
    );
};

export default Home;
