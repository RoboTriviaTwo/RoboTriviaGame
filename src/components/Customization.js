// Customization.js
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Customization = () => {
// for the call to the api 
  const difficultyList = ["easy", "medium", "hard"];
  const [categoryList, setCategoryList] = useState([]);
  
  // user selection to make api call to fetch questions
  const [userChoiceSetting, setUserChoiceSetting] = useState({
    userCategory: '',
    userDifficulty: '',
  })  
  
  // error messages
  const [selectionError, setSelectionError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [networkErrorMsg, setNetworkErrorMsg] = useState(false);

  // ternary for link to quiz

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
    //   secondAPICall();
      setSelectionError(false);
    } else {
      setSelectionError(true);
    }
  };
  
//   const shuffleArr = (array) => {
//     let currentIndex = array.length, randomIndex;
//     // While there remain elements to shuffle...
//     while (currentIndex !== 0) {
//     // Pick a remaining element...
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex--;
//       // And swap it with the current element.
//       [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
//     }
//     return array;
//   }

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
      } else {
        throw new Error();
      }
    }).then((res) => {
        const categoriesRes = res.data.trivia_categories;
        const filteredArray = categoriesRes.filter((item) => {
            return item.name !== 'Art';
        })
        setCategoryList(filteredArray);
      }).catch((err) => {
        if (err.message === "Network Error") {
          setNetworkErrorMsg(true); 
        }
      });
  }, []);

  // const secondAPICall = () => {
  //   if (userChoiceObject.userCategory !== "" && avatarImage !== '') {
  //     axios({
  //       url: "https://opentdb.com/api.php",
  //       method: "GET",
  //       responseType: "json",
  //       params: {
  //         amount: 10,
  //         category: userChoiceObject.userCategory,
  //         type: "multiple",
  //         difficulty: userChoiceObject.userDifficulty,
  //       },
  //     }).then((res) => {
  //       if (res.status === 200) {
  //         return res;
  //       } else {
  //         throw new Error();
  //       }
  //     }).then((res) => {
  //         const returnedObject = res.data.results;

  //         if (returnedObject.length) {
  //           const combinedAnswerArr = [...returnedObject];
  //           combinedAnswerArr.forEach((quizObject) => {
  //             const quizAnswers = [quizObject.correct_answer, ...quizObject.incorrect_answers];
  //             const updatedQuizAnswers = quizAnswers.map((quiz) => {
  //               if (quiz === quizObject.correct_answer) {
  //                 return {
  //                   name: quiz,
  //                   isCorrect: true,
  //                 }
  //               } else {
  //                 return {
  //                   name: quiz,
  //                   isCorrect: false,
  //                 }
  //               }
  //             })
  //             quizObject.answerButtons = shuffleArr(updatedQuizAnswers);
  //           })
  //           setQuizQuestions(true);
  //           props.collectQuizQuestions(combinedAnswerArr, allPlayersArr);
  //         } else {
  //           setQuizQuestions(false);         
  //           setSelectionError(true);           
  //         }
  //         return res;
  //       }).catch((err) => {
  //         if (err.message === "Network Error") {
  //           setNetworkErrorMsg(true); 
  //         }
  //       });
  //   }
  // }
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
                {categoryList.map((categoryObj) => {
                  return (
                      <option key={categoryObj.id} value={categoryObj.id}>
                        {`${categoryObj.name}`}
                      </option>
                    );
                  })}
                </select>

                <label htmlFor="difficulties">Difficulty</label>
                <select 
                  name="difficulties"
                  id="difficulties"
                  onChange={handleDifficultyChoice}
                  value={userChoiceSetting.userDifficulty}
                >
                  <option value="placeholder" default hidden>Pick One</option>

                  {difficultyList.map((difficultyItem) => {
                    return (
                      <option key={difficultyItem} value={difficultyItem}>{`${difficultyItem}`}</option>
                    );
                  })}
                </select>
              </div>

            {/* {
              selectionError ? <p className='errorMessage'>Oops, the trivia wizards need you to pick another category.</p> : null
            }

            {
              networkErrorMsg ? <p className='errorMessage'>Sorry – there was an issue while making the request. Please check again later.</p> : null
            } */}

            <div className='formSubmit'>
                <button type="submit">Submit 🤖 </button>
                <div className="quizRouterBtn">
                  {/* {quizQuestions ? <Link to='/quiz'>Start Quiz »</Link> : null} */}
                </div>
            </div>
          </form>            
        </div>
    )
}

export default Customization;