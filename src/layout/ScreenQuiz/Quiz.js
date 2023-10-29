import React, { useState } from 'react'
import Quizz from '../../quizz.json'
import { Button, Dialog, TextField } from '@mui/material'
import { Link } from 'react-router-dom';

export default function Quiz() {
  const [showPopup, setShowPopup] = useState(false);
  const [password, setPassword] = useState('');
  const [currentQuizId, setCurrentQuizId] = useState(null);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  // const apiQuizz = 'https://server.nglearns.com/quizz/285498f5-3486-434d-a459-bedb6bcea7ce';
  // const lsQuizz = fetch(apiQuizz)
  // .then(res => res.json())
  // .then(data => data.lsQuizz)

  // console.log("list quizz: ", lsQuizz);

  const handleQuizClick = (quizId) => {
    const quiz = Quizz.find((quiz) => quiz.id === quizId);
    if (quiz) {
      setCurrentQuizId(quizId);
      setShowPopup(true);
    }
  };

  const handlePasswordSubmit = () => {
    const quiz = Quizz.find((quiz) => quiz.id === currentQuizId);
    if (quiz && password === quiz.password) {
      setIsPasswordCorrect(true);
    } else {
      alert('Incorrect password.');
    }
  };

  const closeConfirmDialog = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <h1 className='quiz'>Pick one for your test</h1>

      <div className='container mb-5'>
        {Quizz.map((quiz) => {
          return (
            <Button style={{ marginRight: '30px', borderRadius: '20px', width: '200px', fontSize: '20px', top: '70px', marginLeft: '70px' }} variant='contained' onClick={() => handleQuizClick(quiz.id)} key={quiz.id}>
              Quizz {quiz.id}
            </Button>
          );
        })}
      </div>

      <Dialog open={showPopup}>
        <div>
          <h3 style={{ textAlign: 'center' }}>Enter quizz's password</h3>
          <TextField
            style={{ width: '350px', margin: '0 20px' }}
            label='Password'
            variant='outlined'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div style={{ margin: '20px 20px' }}>
          <Button variant='contained' onClick={handlePasswordSubmit}>
            Confirm
          </Button>
          <Button style={{ marginLeft: '20px' }} variant='outlined' onClick={closeConfirmDialog}>
            Cancel
          </Button>
          </div>

          {isPasswordCorrect && (
            <Link to={`/quiz/${currentQuizId}`}>
              <Button style={{ borderRadius: '20px', width: '200px', margin: '20px', marginLeft: '100px', backgroundColor: 'pink', color: 'black', fontWeight: 'bold' }} variant='contained' key={currentQuizId}>
                Start now
              </Button>
            </Link>
          )}

        </div>
      </Dialog>
    </div>
  );
}

