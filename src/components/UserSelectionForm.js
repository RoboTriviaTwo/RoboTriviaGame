import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PlayerNames from './PlayerNames.js';

const UserSelectionForm = (props) => {

  const difficultyArr = ["easy", "medium", "hard"];
  const [categoryArr, setCategoryArr] = useState([]);
  
  // useStates from form component - for second api call
  const [userChoiceObject, setUserChoiceObject] = useState({
    userCategory: '',
    userDifficulty: '',

  })

  // only using for ternary for link to quiz
  const [quizQuestions, setQuizQuestions] = useState(false);

  const [userName, setUserName] = useState('');
  const [avatarImage, setAvatarImage] = useState('');
  const [allPlayersArr, setAllPlayersArr] = useState([
    {
      playerName: "",
      score: 0
    },
  ]);

  const [selectionError, setSelectionError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [networkErrorMsg, setNetworkErrorMsg] = useState(false);

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
    if (avatarImage === '') {
      setAvatarError(true)
    } 
    if (userChoiceObject.userCategory && userChoiceObject.userDifficulty) {
      secondAPICall();
      setSelectionError(false);
    } else {
      setSelectionError(true);
    }
  };
  
  const handleUserName = (event) => {
    setUserName(event.target.value)
  }

  const handleAvatarSubmit = (event) => {
    event.preventDefault()
    setAvatarImage(userName)
    setAvatarError(false)
  };

  const allPlayerArrUpdate = () => {
    let tempAllPlayersArr = [...allPlayersArr];
    tempAllPlayersArr[0] = {
      ...tempAllPlayersArr[0],
      playerName: userName
    }
    setAllPlayersArr(tempAllPlayersArr);
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

  useEffect(() => {
    axios({
      url: "https://opentdb.com/api_category.php",
      method: "GET",
      responseType: "json",
      params: {},
    }).then((res) => {
      if (res.statusText === "OK" || res.status === 200) {
        return res;
      } else {
        throw new Error();
      }
    }).then((res) => {
        setCategoryArr(res.data.trivia_categories);
      }).catch((err) => {
        if (err.message === "Network Error") {
          setNetworkErrorMsg(true); 
        }
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
      }).then((res) => {
        if (res.status === 200) {
          return res;
        } else {
          throw new Error();
        }
      }).then((res) => {
          const returnedObject = res.data.results;

          if (returnedObject.length) {
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
            setQuizQuestions(true);
            props.collectQuizQuestions(combinedAnswerArr, allPlayersArr);
          } else {
            setQuizQuestions(false);         
            setSelectionError(true);           
          }
          return res;
        }).catch((err) => {
          if (err.message === "Network Error") {
            setNetworkErrorMsg(true); 
          }
        });
    }
  }
  return (
    <>
    <main>
      <section>
        <div className='userFormContainer'>
          <PlayerNames
            handleUserName={handleUserName}
            userName={userName}
            allPlayerArrUpdate={allPlayerArrUpdate}
            handleAvatarSubmit={handleAvatarSubmit}
            avatarImage={avatarImage}
            avatarError={avatarError}
          />
          <form
            className='userSelectionContainer'
            action=""
            onSubmit={(event) => {
            submitHandler(event);
            }}
          >
            <fieldset className='formHeader'>
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
              selectionError ? <p className='errorMessage'>Oops, the trivia wizards need you to pick another category.</p> : null
            }

            {
              networkErrorMsg ? <p className='errorMessage'>Sorry – there was an issue while making the request. Please check again later.</p> : null
            }

            <div className='formSubmit'>
                <button type="submit">Submit 🤖 </button>
                <div className="quizRouterBtn">
                  {quizQuestions ? <Link to='/quiz'>Next »</Link> : null}
                </div>
            </div>
          </form>
        </div>
      </section>
   </main>      
   <footer>
        <p>Created at <a href='www.junoCollege.com'>Juno College</a> 2022</p>
    </footer> 
    </>
  );
};

export default UserSelectionForm;
