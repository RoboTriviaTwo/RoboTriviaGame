import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PlayerNames from './PlayerNames.js';
import Quiz from './Quiz.js';

const UserSelectionForm = (props) => {

  const difficultyArr = ["easy", "medium", "hard"];
  // api call for category
  const [categoryArr, setCategoryArr] = useState([]);
  
  // useStates from form component - for second api call
  const [userChoiceObject, setUserChoiceObject] = useState({
    userCategory: '',
    userDifficulty: '',

  })


  // setting state with quiz questions
  const [quizQuestions, setQuizQuestions] = useState([]);

  // setting state with player score
  // const [currentPlayerScore, setCurrentPlayerScore] = useState(0);

  // collect user name and produce avatar
  const [userName, setUserName] = useState('');
  const [avatarImage, setAvatarImage] = useState('');
  
  const [allPlayersArr, setAllPlayersArr] = useState([
    {
      playerName: "",
      score: 0
    },
  ]);

  // const addScoreToObj = (param) => {
  //   setAllPlayersArr(param)
  // }

  const [selectionError, setSelectionError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  // Start of User Selections
  const handleCategoryChoice = (event) => {
    setUserChoiceObject((prevState) => {
      return {...prevState, userCategory: event.target.value}
    })

  };

  const handleDifficultyChoice = (event) => {
    setUserChoiceObject((prevState) => {
      return {...prevState, userDifficulty: event.target.value}
    })

  };

  const submitHandler = (event) => {
    event.preventDefault();
    secondAPICall();

    if (avatarImage === '') {
      setAvatarError(true)
    }
    window.scrollTo({
      top: 2000,
      left: 100,
      behavior: 'smooth'
    });
  };
  


  const handleUserName = (event) => {
    setUserName(event.target.value)
  }

  // const scoreSetter = (score) => {
  //   setCurrentPlayerScore(score)
  // }

  // useEffect(() => {
  //   scoreUpdate()
  // }, [currentPlayerScore])

  const handleAvatarSubmit = (event) => {
    event.preventDefault()
    setAvatarImage(userName)
    setAvatarError(false)
  };

  const AllPlayerArrUpdate = () => {
    let tempAllPlayersArr = [...allPlayersArr];
    tempAllPlayersArr[0] = {
      ...tempAllPlayersArr[0],
      playerName: userName
    }
    setAllPlayersArr(tempAllPlayersArr);
  }

  // const scoreUpdate = () => {
  //   let tempAllPlayersArr = [...allPlayersArr];
  //   tempAllPlayersArr[0] = {
  //     ...tempAllPlayersArr[0],
  //     score: currentPlayerScore
  //   }
  //   setAllPlayersArr(tempAllPlayersArr);
  // }

  const handleNameSubmit = () => {
        AllPlayerArrUpdate()
  }
 
  const shuffleArr = (array) => {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
    // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
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


  const secondAPICall = () => {
    if (userChoiceObject.userCategory !== "" && avatarImage !== '') {
      axios({
        url: "https://opentdb.com/api.php",
        method: "GET",
        responseType: "json",
        params: {
          amount: 10,
          category: userChoiceObject.userCategory,
          type: "multiple",
          difficulty: userChoiceObject.userDifficulty,
        },
      })
        .then((res) => {
          // questions array

          const returnedObject = res.data.results;
          const combinedAnswerArr = [...returnedObject];

          combinedAnswerArr.forEach((quizObject) => {
            const quizAnswers = [quizObject.correct_answer, ...quizObject.incorrect_answers];
            const updatedQuizAnswers = quizAnswers.map((quiz) => {
              if (quiz === quizObject.correct_answer) {
                return {
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
          props.collectQuizQuestions(combinedAnswerArr, allPlayersArr);
          return res;
        })
        .then((res) => {
          if (res.data.results.length === 0) {
            setSelectionError(true);
          } else {
            setSelectionError(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <main>
      <section>
        <div className='userInputs'>
          <PlayerNames
            handleUserName={handleUserName}
            userName={userName}
            handleNameSubmit={handleNameSubmit}
            handleAvatarSubmit={handleAvatarSubmit}
            avatarImage={avatarImage}
            avatarError={avatarError}
          />
          <form
            className='choicesForm'
            action=""
            onSubmit={(event) => {
            submitHandler(event);
            }}
          >
            <fieldset>
              <div className='playerChoiceCard wrapper'>
                <label htmlFor="categoryType">Category</label>
                <select 
                  name="categoryType"
                  id="categoryType"
                  onChange={handleCategoryChoice}
                  value={userChoiceObject.userCategory}
                >
                <option value="placeholder" default hidden>Pick One</option>
                {categoryArr.map((categoryObj) => {
                  return (
                      <option key={categoryObj.id} value={categoryObj.id}>
                        {`${categoryObj.name}`}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className='playerChoiceCard'>
                <label htmlFor="difficulties">Difficulty</label>
                <select 
                  name="difficulties"
                  id="difficulties"
                  onChange={handleDifficultyChoice}
                    value={userChoiceObject.userDifficulty}
                >
                  <option value="placeholder" default hidden>Pick One</option>

                  {difficultyArr.map((difficultyItem) => {
                    return (
                      <option key={difficultyItem} value={difficultyItem}>{`${difficultyItem}`}</option>
                    );
                  })}
                </select>
              </div>
            </fieldset>

            {
              selectionError ? <p className='errorMessage'>Oops - there was an error!  The trivia wizards need you to pick another category.</p> : null
            }
            <div className='formSubmit'>
                <button type="submit">Submit 🤖 </button>

                {/* Link to show onclick */}
                {quizQuestions.length > 0 ? <Link to='/quiz'>Next</Link> : null}
                
            </div>
          </form>
        </div>
      </section>

      <section className="wrapper">
        {/* Pass the allPlayersArr to Quiz */}
        {/* <Quiz 
          quizQuestions={quizQuestions}
          addScoreToObj={addScoreToObj}
          // scoreSetter={scoreSetter}
          allPlayersArr={allPlayersArr}
        /> */}
      </section>
   </main>       
  );
};

export default UserSelectionForm;
