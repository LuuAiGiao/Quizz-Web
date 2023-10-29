import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Question from '../../components/Question';
import { Button, Dialog } from '@mui/material';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

export default function QuizDetail() {
  const quizId = useParams();
  console.log(quizId);
  const [countDown, setCountDown] = useState(30);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    const storedCountDown = localStorage.getItem('countDown');
    if (storedCountDown) {
      setCountDown(Number(storedCountDown));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('countDown', countDown);
  }, [countDown]);

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
      <div style={{ left: '100px'}}>

      <AccessAlarmIcon className='timer' style={{ fontSize: 60, color: 'red', marginLeft: '100px' }}/>
      <h3 className='timer' style={{ color: 'red', top: '200px', left: '170px' }}>{countDown} second</h3>
      </div>
      
      <Question quizId={quizId} isTimeUp={isTimeUp} countDown={countDown} setCountDown={setCountDown} />

    </div>
  )
}
