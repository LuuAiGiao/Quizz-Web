import { Button, Dialog, Typography } from '@mui/material';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export default function Result() {
    const location = useLocation();
    const { score, quizId, time } = location.state;
    const timer = 30 - time;
    const nav = useNavigate();

    const handleStartAgain = () => {
      nav(`/quiz/${location.state.quizId}`);
    };
  return (
    <div>
        <EmojiEventsIcon style={{ marginTop: '100px', fontSize: 190, marginLeft: '43%', color: 'rgb(252,194,0)' }}/>
        <div style={{ border: '', backgroundColor: 'white', textAlign: 'center', width: '40%', marginLeft: '30%', borderRadius: '20px', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)' }}>
          <h4 style={{ color: 'green', fontSize: '30px' }}>Test result</h4>
          <Typography variant="h5">Correct: {score}</Typography>
          <Typography variant="h5">Time: {timer} s</Typography>
          <Button style={{ margin: '20px 30px', width: '250px', borderRadius: '20px' }} onClick={() => handleStartAgain()} variant='contained'>Start quiz again</Button>
        </div>
    </div>
  )
}
