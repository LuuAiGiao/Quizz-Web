import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation';
import { Route, Routes } from 'react-router-dom';
import Home from './layout/ScreenHome/Home';
import Quiz from './layout/ScreenQuiz/Quiz';
import QuizDetail from './layout/ScreenQuiz/QuizDetail';
import Result from './layout/ScreenQuiz/Result';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='*' element={<h1>404</h1>}/>
        <Route path='/quiz' element={<Quiz />}/>
        <Route path='/quiz/:id' element={<QuizDetail />}/>
        <Route path='/quiz/:id/result' element={<Result />}/>
      </Routes>
      
    </div>
  );
}

export default App;
