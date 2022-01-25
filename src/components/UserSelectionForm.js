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

  const randomizer = () => {
    return Math.floor(Math.random() * 4);
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
          const combinedAnswers = (quizQuestions) => {

            const combinedAnswerArr = [...quizQuestions]
            combinedAnswerArr.forEach((quizObject) => {
              quizObject.allAnswers = quizObject.incorrect_answers.splice(randomizer(), 0, quizObject.correct_answer)
            })
            setQuizQuestions(combinedAnswerArr);
            console.log(quizQuestions);
          }

          combinedAnswers(returnedObject);
          // returnedObject.forEach()
          // setQuizQuestions(returnedObject);
          // code for questions!


          // const resturnedObject = res.data.results


          // const combinedAnswers = (triviaQuestion) => {
          //   const responseWithCombined = [...triviaQuestion];
          //   // Need to figure out how to shuffle the answers
          //   responseWithCombined.forEach((triviaObject) => {
          //     triviaObject.allAnswers = [...triviaObject.incorrect_answers, triviaObject.correct_answer]
          //   })
          //   setQuizQuestions(responseWithCombined);
          // }
          // combinedAnswers(resturnedObject);
          // console.log(quizQuestions)
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
          {/* <select
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
      
      <PlayerNames />
      <Quiz quizQuestions={quizQuestions} />

    {/* {submitButton ? <Link to={`/playernames/${numOfPlayers}`}>Continue player names</Link> : null} */}
    </>
  );
};

export default UserSelectionForm;
