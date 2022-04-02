import { Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './components/LandingPage';
import UserSelection from './components/UserSelection';
import Customization from './components/Customization.js';
import GameDisplay from './components/GameDisplay';
import UserScoreCard from "./components/UserScoreCard.js";
import './styles/sass/App.scss';

function App() {
  const [quizQuestions, setQuizQuestions] = useState([]);

  const [appPlayerInfo, setAppPlayerInfo] = useState([]); // new

  const updatePlayerInfo = function(playerInfo) {
    setAppPlayerInfo(playerInfo);
  }

  const addQuizQuestions = (quizQuestions) => {
    setQuizQuestions(quizQuestions);
  }

  return (
    <div className="app">
      <header className='wrapper'>
        <h1>Robo<span>Trivia</span></h1>
      </header> 

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/welcome' element={<UserSelection updatePlayerInfo={updatePlayerInfo}/>}/>
        <Route path='/customize' element={<Customization addQuizQuestions={addQuizQuestions}/>}/>
        <Route path='/quiz' element={<GameDisplay quizQuestions={quizQuestions} updatePlayerInfo={updatePlayerInfo} appPlayerInfo={appPlayerInfo}/>}/> 
        <Route path='/scoreboard' element={<UserScoreCard appPlayerInfo={appPlayerInfo}/>}/> 
      </Routes>
      <footer>
        <p>Created at <a href='www.junoCollege.com'>Juno College</a> 2022</p>
      </footer> 
    </div>
  );
}

export default App;
