import { Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './components/LandingPage';
import UserSelection from './components/UserSelection';
import Customization from './components/Customization.js';
import GameDisplay from './components/GameDisplay';
import './styles/sass/App.scss';

function App() {
  const [quizQuestions, setQuizQuestions] = useState([]);

  // const [allPlayersArr, setAllPlayersArr] = useState([
  //   {
  //     playerName: "",
  //     score: 0,
  //     avatar: ""
  //   },
  // ]);

  // function to update with player's updated score on their object
  // const updatePlayerArr = (userObj) => {
  //   setAllPlayersArr(userObj)
  // }

  const [playerInfo, setPlayerInfo] = useState([]); // new

  const updatePlayerInfo = function(playerInfo) {
    setPlayerInfo(playerInfo);
  }

  const apiQuizSelect = (quizQuestions, allPlayersArr) => {
    console.log("sets our quiz questions")
    // setQuizQuestions(quizQuestions);
    // setAllPlayersArr(allPlayersArr);
  }

  return (
    <div className="app">
      <header className='wrapper'>
        <h1>Robo<span>Trivia</span></h1>
      </header> 

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/welcome' element={<UserSelection apiQuizSelect={apiQuizSelect}  updatePlayerInfo={updatePlayerInfo}/>}/>
        <Route path='/customize' element={<Customization />}/>
        {/* <Route path='/quiz' element={<GameDisplay quizQuestions={quizQuestions} updatePlayerArr={updatePlayerArr} allPlayersArr={allPlayersArr}/>}/>      */}
      </Routes>
    </div>
  );
}

export default App;
