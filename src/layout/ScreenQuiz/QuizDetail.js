import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Question from '../../components/Question';
import { Button, Dialog } from '@mui/material';

export default function QuizDetail() {
  const quizId = useParams();
  console.log(quizId);
  const [countDown, setCountDown] = useState(30);
  const [isTimeUp, setIsTimeUp] = useState(false);
  // const [showPopup, setShowPopup] = useState(false);
  // const handleSubmit = () => {
  //   setShowPopup(true);
  // }
  useEffect(() => {
    const timer = setTimeout(() => {
      if (countDown > 0) {
        setCountDown(countDown - 1)
      } else {
        alert("Time is out.");
        setIsTimeUp(true);
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [countDown])
  return (
    <div>
      <h1 className='title'>Quiz {quizId.id}</h1>
      <h3 className='timer'>Time remaining: {countDown} second</h3>
      <Question quizId={quizId} isTimeUp={isTimeUp} />

    </div>
  )
}
