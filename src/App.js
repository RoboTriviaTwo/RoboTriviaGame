import { Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './components/LandingPage';
import UserSelectionForm from './components/UserSelectionForm';
import Quiz from './components/Quiz';
import './styles/sass/App.scss';

function App() {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [allPlayersArr, setAllPlayersArr] = useState([
    {
      playerName: "",
      score: 0
    },
  ]);

  // function to update with player's updated score on their object
  const updatePlayerArr = (userObj) => {
    setAllPlayersArr(userObj)
  }

  const collectQuizQuestions = (quizQuestions, allPlayersArr) => {
    setQuizQuestions(quizQuestions);
    setAllPlayersArr(allPlayersArr);
  }

  return (
    <div className="app">
      <header className='wrapper'>
        <h1>Robo<span>Trivia</span></h1>
      </header> 

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/welcome' element={<UserSelectionForm collectQuizQuestions={collectQuizQuestions} allPlayersArr={allPlayersArr} updatePlayerArr={updatePlayerArr}/>}/>
        <Route path='/quiz' element={<Quiz quizQuestions={quizQuestions} updatePlayerArr={updatePlayerArr} allPlayersArr={allPlayersArr}/>}/>     
      </Routes>
    </div>
  );
}

export default App;
