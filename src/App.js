import axios from 'axios';
import { useEffect, useState } from 'react';
import UserSelectionForm from './components/UserSelectionForm.js';
import { Route, Routes } from 'react-router-dom';
import PlayerNames from './components/PlayerNames.js';

// import { Routes, Route, Link} from 'react-router-dom';
import './styles/sass/App.scss';

function App() {
  // api call for category
  const [categoryArr, setCategoryArr] = useState([]);

  // useStates from form component - for second api call
  const [numOfPlayers, setNumOfPlayers] = useState(0);

  const [userCategory, setUserCategory] = useState("");
  const [userDifficulty, setUserDifficulty] = useState("");

  const [submitButton, setSubmitButton] = useState(false)

  const handlePlayerNumber = (event) => {
    setNumOfPlayers(event.target.value);
  }

  const handleCategoryChoice = (event) => {
    setUserCategory(event.target.value);
    // console.log(userCategory);
  }

  const handleDifficultyChoice = (event) => {
    setUserDifficulty(event.target.value);
    // console.log(userDifficulty);
  }

  const submitHandler = (event) => {
      event.preventDefault();
      setSubmitButton(!submitButton);
    };

  // useEffect for axios - put this info in dropdown
  // associate id and name of category
  useEffect(() => {
    axios({
      url: "https://opentdb.com/api_category.php",
      method: "GET",
      responseType: "json",
      params: {},
    })
      .then((res) => {
        setCategoryArr(res.data.trivia_categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])


useEffect( () => {
  if (userCategory !== ""){
    
    axios({
        url: "https://opentdb.com/api.php",
        method: "GET",
        responseType: "json",
        params: {
          // category: 19,
          // type: "multiple",
          // difficulty: "hard",
          amount: 10,
          category: userCategory,
          type: "multiple",
          difficulty: userDifficulty,
        },
      })
      .then((res) => {
        console.log(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}, [submitButton])

  return (
    <div>
      <h1>RoboTrivia</h1>
      <UserSelectionForm 
        array={categoryArr} 
        submitHandler={submitHandler} 
        handlePlayerNumber={handlePlayerNumber}
        handleCategoryChoice={handleCategoryChoice} 
        handleDifficultyChoice={handleDifficultyChoice}
        numOfPlayers={numOfPlayers}
        userCategory={userCategory}
        userDifficulty={userDifficulty} 
      />

      <Routes>
        <Route path='/playernames/:num' element={<PlayerNames />} />
      </Routes>

    </div>
  );
}

export default App;

// npm install
// axios


// pseudo code
// ===========Landing page============
// Landing page with number of players
    // - need a form with a drop down for choosing number of players
    // - start button
    // populate drop down menu with an intial API call for categories and difficulties
    // question type will be fixed to multiple choice


// ===========Player Info============ 
// page to collect user name and show
    // This depends on the num-player chosen from loading page
    // this process will populate name and robot part of our data structure
    // button to proceed to next stage 

  
// ===========quiz section============ (4 routes)
    // a screen display for a start of a player
    // questions will be displayed
    // players will take turn answering 10 questions.
        // - animation for each correct/in-correct answer
        // - upon completion a screen indicationg completion + start of next player
        // - update score in user object inside players array
    

// ===========score board============
    // after all players complete their turns, display score board.
    // display highest score among the 4 players. (animation?)
    // retrive highscore from firebase db and show a aomparison to current sessions higest score.
    // if the sessions' highest score is above db highscore set new highscore to db
    // include a play again button to go back to first stage.
        // - store sessions user data in to db for stretch goal





    // let handleInput = onchange( ()=> {
    //   return (
    //     // what user typed
    //   )
    // });



  // sample data structure
    // let playerArray = [
    //   {
    //     name: xxx,
    //     robot: xxx,
    //     categoryScore: xxx,
    //     score: xxx
    //   },

    //   {
    //     name: xxx,
    //     robot: xxx,
    //     categoryScore: xxx,
    //     score: xxx
    //   },

    //   {
    //     name: xxx,
    //     robot: xxx,
    //     categoryScore: xxx,
    //     score: xxx
    //   },

    //   {
    //     name: xxx,
    //     robot: xxx,
    //     categoryScore: xxx,
    //     score: xxx
    //   },
    // ]

    // let variable = useInput;
    // `https://robohash.org/${variable}.png`
