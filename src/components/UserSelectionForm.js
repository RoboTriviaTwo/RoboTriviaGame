import { useState, useEffect } from 'react';
import axios from 'axios';
import PlayerNames from './PlayerNames.js';
import Quiz from './Quiz.js';

  const UserSelectionForm = () => {

  const difficultyArr = ["easy", "medium", "hard"];
  // api call for category
  const [categoryArr, setCategoryArr] = useState([]);
  // useStates from form component - for second api call
  // const [numOfPlayers, setNumOfPlayers] = useState(0);
  const [userCategory, setUserCategory] = useState("");
  const [userDifficulty, setUserDifficulty] = useState("");
  const [submitButton, setSubmitButton] = useState(false);

  // setting state with quiz questions
  const [quizQuestions, setQuizQuestions] = useState([]);

  const [avatarImage, setAvatarImage] = useState([]);
  const [userName, setUserName] = useState('');
  const [allPlayersArrCounter, setAllPlayerArrCounter] = useState(0);
  const [allPlayersArr, setAllPlayersArr] = useState([
    {
      playerName:"",
      score:0
    },
    // // @@@ for multiplayer
    // {
    //   playerName: "",
    //   score: 0
    // },
    // {
    //   playerName: "",
    //   score: 0
    // },
    // {
    //   playerName: "",
    //   score: 0
    // },
  ]);
  

  // const handlePlayerNumber = (event) => {
  //   setNumOfPlayers(event.target.value);
  // };

  const handleCategoryChoice = (event) => {
    setUserCategory(event.target.value);
  };

  const handleDifficultyChoice = (event) => {
    setUserDifficulty(event.target.value);
    // console.log(userDifficulty);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setSubmitButton(!submitButton);
  };

  const handleUserName = (event) => {
    setUserName(event.target.value)
    
    // console.log(userName)
  }

  const handleAvatarSubmit = (event) => {
    event.preventDefault()
    // console.log(event)
    setAvatarImage(userName)
    // setAvatarUrl(`https://robohash.org/${avatarImage}.png`)
  };

  const AllPlayerArrUpdate = () => {
    // // @@@ for multiplayer
    // let tempAllPlayersArr = [...allPlayersArr];
    // tempAllPlayersArr[allPlayersArrCounter] = {
    //   ...tempAllPlayersArr[allPlayersArrCounter],
    //   playerName: userName
    // }
    // setAllPlayersArr(tempAllPlayersArr);

    let tempAllPlayersArr = [...allPlayersArr];
    tempAllPlayersArr[0] = {
      ...tempAllPlayersArr[0],
      playerName: userName
    }
    setAllPlayersArr(tempAllPlayersArr);
  }

  const handleNameSubmit = () => {
    if (avatarImage) {
      AllPlayerArrUpdate()
    }
    // //@@@ for multiplayer
    // if(avatarImage && allPlayersArrCounter < 4){
    //   AllPlayerArrUpdate()
    //   setAllPlayerArrCounter(allPlayersArrCounter + 1)
    //   if(allPlayersArrCounter === 3){
    //     setAllPlayerArrCounter(0);
    //   }
    // }  
  }

  const shuffleArr = (array) => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }
    
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
  }, []);

  useEffect(() => {
    // console.log("app is running");
    if (userCategory !== "") {
      axios({
        url: "https://opentdb.com/api.php",
        method: "GET",
        responseType: "json",
        params: {
          amount: 10,
          category: userCategory,
          type: "multiple",
          difficulty: userDifficulty,
        },
      })
        .then((res) => {
          // questions array
          const returnedObject = res.data.results;

          // console.log(returnedObject);

          const combinedAnswerArr = [...returnedObject];

          combinedAnswerArr.forEach((quizObject) => {
            const quizAnswers = [quizObject.correct_answer, ...quizObject.incorrect_answers];
            const updatedQuizAnswers = quizAnswers.map((quiz) => {
              if(quiz === quizObject.correct_answer){
                return{
                  name: quiz,
                  isCorrect: true,
                }
              } else {
                return {
                  name: quiz,
                  isCorrect: false,
                }
              }
            })
            quizObject.answerButtons = shuffleArr(updatedQuizAnswers);
          })

          setQuizQuestions(combinedAnswerArr);
          
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [submitButton]);

  return (
    <>
      <form
        action=""
        onSubmit={(event) => {
          submitHandler(event);
        }}
      >
        <fieldset>
          <label htmlFor="playerNumbers">Choose the Number of Players</label>
          {/* @@@ for multiplayer
          <select
            name="playerNumbers"
            id="playerNumbers"
            onChange={handlePlayerNumber}
            value={numOfPlayers}
          >
            <option value="placeholder" default hidden>
              Pick One
            </option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select> */}

          <label htmlFor="categoryType">Choose Your Category</label>
          <select
            name="categoryType"
            id="categoryType"
            onChange={handleCategoryChoice}
            value={userCategory}
          >
            <option value="placeholder" default hidden>
              Pick One
            </option>
            {categoryArr.map((categoryObj) => {
              return (
                <option key={categoryObj.id} value={categoryObj.id}>
                  {`${categoryObj.name}`}
                </option>
              );
            })}
          </select>

          <label htmlFor="difficulties">Choose Your Difficulty</label>
          <select
            name="difficulties"
            id="difficulties"
            onChange={handleDifficultyChoice}
            value={userDifficulty}
          >
            <option value="placeholder" default hidden>
              Pick One
            </option>
            {difficultyArr.map((difficultyItem) => {
              return (
                <option key={difficultyItem} value={difficultyItem}>
                  {`${difficultyItem}`}
                </option>
              );
            })}
          </select>
          <button type="submit">Submit</button>
        </fieldset>
      </form>
      
      <PlayerNames 
        handleUserName={handleUserName}
        userName={userName}
        handleNameSubmit={handleNameSubmit}
        handleAvatarSubmit={handleAvatarSubmit}
        avatarImage={avatarImage}
      />
      <Quiz quizQuestions={quizQuestions} />

    {/* {submitButton ? <Link to={`/playernames/${numOfPlayers}`}>Continue player names</Link> : null} */}
    </>
  );
};

export default UserSelectionForm;
