import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Dialog, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import Quizz from '../quizz.json'

export default function Question({ quizId, isTimeUp, countDown, setCountDown }) {
  // console.log(quizId)
  const selectedQuiz = Quizz.find((quiz) => quiz.id === parseInt(quizId.id));

  const shuffleQuestions = (questions) => {
    const shuffled = [...questions]; 
    shuffled.sort(() => Math.random() - 0.5);
    return shuffled;
  };

  const [shuffledQuestions, setShuffledQuestions] = useState(shuffleQuestions(selectedQuiz.lsQuizz));

  const [userAnswers, setUserAnswers] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [score, setScore] = useState(0);

  const nav = useNavigate();

  const handleSubmit = () => {
    const time = countDown;
    setCountDown(30);
    localStorage.setItem('countDown', 30);
    nav(`/quiz/${quizId.id}/result`, { state: { score: score, quizId: quizId.id, time: time } });
  };


  const handleAnswerChange = (questionId, answerId) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answerId,
    }));
    console.log("User answers:", userAnswers);
  };

  const closeConfirmDialog = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    if (isTimeUp) {
      handleSubmit();
    }
  }, [isTimeUp])

  useEffect(() => {
    const restoredAnswers = JSON.parse(localStorage.getItem('userAnswers'));
    if (restoredAnswers) {
      setUserAnswers(restoredAnswers);
    }

  }, []);

  useEffect(() => {
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
  }, [userAnswers]);

  useEffect(() => {
    const correctAnswers = selectedQuiz.lsQuizz.reduce((answers, quiz) => {
      answers[quiz.id] = quiz.answer.find((answer) => answer.isCorrect).id;
      return answers;
    }, {});

    let newScore = 0;

    for (const questionId in userAnswers) {
      if (userAnswers[questionId] === correctAnswers[questionId]) {
        newScore++;
      }
    }

    setScore(newScore);
  }, [userAnswers, selectedQuiz]);

  if (!selectedQuiz) {
    return (
      <div>
        <p>Quiz not found</p>
      </div>
    );
  }

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto', padding: 2 }}>
      <CardContent>
        <Typography style={{ fontWeight: 'bold' }} variant="h4" gutterBottom>
          {selectedQuiz.title}
        </Typography>
        {shuffledQuestions.map((quiz, index) => (
          <div key={quiz.id}>
            <Typography style={{ fontSize: '20px', fontWeight: 'bold', fontStyle: 'italic', marginTop: '60px' }} variant="h5" gutterBottom sx={{ textAlign: 'left' }}>
              Question {index + 1}:
            </Typography>
            <Typography sx={{ textAlign: 'left' }} variant="body1">{quiz.content}</Typography>
            <FormControl>

              <RadioGroup sx={{ textAlign: 'left' }}>
                {quiz.answer.map((answer) => (
                  <FormControlLabel
                    style={{ left: 0 }}
                    key={answer.id}
                    value={answer.id.toString()}
                    control={<Radio />}
                    label={answer.content}
                    onChange={() => handleAnswerChange(quiz.id, answer.id)}
                    checked={userAnswers[quiz.id] === answer.id}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
        ))}
      </CardContent>
      <Button style={{ borderRadius: '20px', width: '120px', marginLeft: '300px' }} onClick={() => handleSubmit()} variant='contained'>Submit</Button>

    </Card>
  )
}
