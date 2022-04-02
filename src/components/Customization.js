// Customization.js
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import replaceRegex from '../utils/replaceRegex';

const Customization = (props) => {
  // for the call to the api 
  const difficultyList = ["easy", "medium", "hard"];
  const [categoryList, setCategoryList] = useState([]);
  
  const [userChoiceSetting, setUserChoiceSetting] = useState({
    userCategory: '',
    userDifficulty: '',
  })  
  
  // errors - ternary states for error messages
  const [selectionError, setSelectionError] = useState(false);
  const [networkErrorMsg, setNetworkErrorMsg] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState(false);
  const [retryCategory, setRetryCategory] = useState(false);

  const handleCategoryChoice = (event) => {
    setUserChoiceSetting((prevState) => {
      return {...prevState, userCategory: event.target.value}
    })
  };

  const handleDifficultyChoice = (event) => {
    setUserChoiceSetting((prevState) => {
      return {...prevState, userDifficulty: event.target.value}
    })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (userChoiceSetting.userCategory && userChoiceSetting.userDifficulty) {
        setSelectionError(false);
        GetQuizContent();
    } else {
        setSelectionError(true);
    }
  };
  
  const shuffleArr = (array) => {
      let currentIndex = array.length, randomIndex;

      while (currentIndex !== 0) {
      // Pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }
      return array;
  }

  // sets the category 
  useEffect(() => {
      axios({
        url: "https://opentdb.com/api_category.php",
        method: "GET",
        responseType: "json",
        params: {},
      }).then((res) => {
        if (res.statusText === "OK" || res.status === 200) {
          return res;
        } 
      }).then((res) => {
          const categoriesRes = res.data.trivia_categories;
          setCategoryList(categoriesRes.filter((item) => {
              return item.name !== 'Art';
          }));
      }).catch((err) => {
      if (err.message === "Network Error") {
          setNetworkErrorMsg(true); 
      }
      });
  }, []);

  const GetQuizContent = () => {
      axios({
        url: "https://opentdb.com/api.php",
        method: "GET",
        responseType: "json",
        params: {
          amount: 10,
          category: userChoiceSetting.userCategory,
          type: "multiple",
          difficulty: userChoiceSetting.userDifficulty,
        },
      }).then((res) => {
        if (res.status === 200) {
          return res;
        }
      }).then((res) => {
          const quizResults = res.data.results;
 
          if (quizResults.length) {
            const randomizedAnswerArr = [...quizResults];
            randomizedAnswerArr.forEach((quizObject) => {
              const quizAnswers = [quizObject.correct_answer, ...quizObject.incorrect_answers];
              const eachAnswerArr = quizAnswers.map((quiz) => {
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
              quizObject.answerButtons = shuffleArr(eachAnswerArr);
            })
            replaceRegex(randomizedAnswerArr);
            setQuizQuestions(true);
            props.addQuizQuestions(randomizedAnswerArr);
            setRetryCategory(false);   
          } else {
            setQuizQuestions(false);     
            setRetryCategory(true);             
          }
          return res;
        }).catch((err) => {
          if (err.message === "Network Error") {
            setNetworkErrorMsg(true); 
          }
        });
  }
    return (
        <div className="userSelection">
           <form className='userSelectionContainer' onSubmit={(event) => {submitHandler(event)}}>
              <div className='playerChoiceCard wrapper'>
                <label htmlFor="categoryType">Category</label>
                <select 
                  name="categoryType"
                  id="categoryType"
                  onChange={handleCategoryChoice}
                  value={userChoiceSetting.userCategory}
                >
                <option value="placeholder" default hidden>Pick One</option>
                {categoryList.map((category) => {
                  return (
                      <option key={category.id} value={category.id}>
                        {`${category.name}`}
                      </option>
                    );
                  })}
                </select>

                <label htmlFor="difficulty">Difficulty</label>
                <select 
                  name="difficulty"
                  id="difficulty"
                  onChange={handleDifficultyChoice}
                  value={userChoiceSetting.userDifficulty}
                >
                  <option value="placeholder" default hidden>Pick One</option>

                  {difficultyList.map((difficulty) => {
                    return (
                      <option key={difficulty} value={difficulty}>{`${difficulty}`}</option>
                    );
                  })}
                </select>
              </div>

            {
               selectionError && <p className='errorMessage'>Oops, please fill in the required inputs.</p>
            }
            
            {
              retryCategory && <p className='errorMessage'>Oops, the trivia wizards need you to pick another category.</p>
            }

            {
              networkErrorMsg && <p className='errorMessage'>Sorry – there was an issue while making the request. Please check again later.</p>
            }

            <div className='formSubmit'>
                <button type="submit">Submit 🤖 </button>
                <div className="quizRouterBtn">
                  {quizQuestions && <Link to='/quiz'>Start Quiz »</Link>}
                </div>
            </div>
          </form>            
        </div>
    )
}

export default Customization;