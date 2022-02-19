import { Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './components/LandingPage';
import UserSelectionForm from './components/UserSelectionForm';
import Quiz from './components/Quiz';

import './styles/sass/App.scss';

// state of quiz questions

// function
  // set state with the parameters

// for route
// quizQuestions={quizQuestions} addScoreToObj={addScoreToObj} allPlayersArr={allPlayersArr}

function App() {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [allPlayersArr, setAllPlayersArr] = useState([
    {
      playerName: "",
      score: 0
    },
  ]);

  const addScoreToObj = (param) => {
    setAllPlayersArr(param)
  }

  const collectQuizQuestions = (quizQuestions, allPlayersArr) => {
    console.log(quizQuestions, allPlayersArr);
    setQuizQuestions(quizQuestions);
    setAllPlayersArr(allPlayersArr);
  }

  return (
    <div className="app">
      <header>
        <h1 className='wrapper'>Robo<span>Trivia</span></h1>
      </header> 
      {/* Routes to the landing page and quiz */}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/welcome' element={<UserSelectionForm collectQuizQuestions={collectQuizQuestions}/>}/>
        <Route path='/quiz' element={<Quiz quizQuestions={quizQuestions} addScoreToObj={addScoreToObj} allPlayersArr={allPlayersArr}/>}/>     
      </Routes>

      <footer>
        <p>Created at <a href='www.junoCollege.com'>Juno College</a> 2022</p>
      </footer>
    </div>
  );
}

export default App;
