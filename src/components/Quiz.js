import { useState } from "react";
// import scoreboard
import Scoreboard from "./Scoreboard.js";


const Quiz = (props) => {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  // let currentPlayerScore = 0; 
  // const [ isCorrect, setIsCorrect ] = useState(false);

  // useState to show score
  const [scoreboard, setScoreboard] = useState(false);

  // useState to set the popup of quiz done
  const [popup, setPopup] = useState(false);

  const handleAnswerClick = (event, value) => {
    const userAnswer = event.target.value;
    if (userAnswer === props.quizQuestions[currentQuestion].correct_answer) {
      console.log("Correct!");
      setCurrentScore(currentScore + 100);
      // setIsCorrect(true);  
    } else {
      console.log("Nope!");
      // setIsCorrect(false);
    }

    if (currentQuestion < props.quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setScoreboard(true);
      setPopup(true);
      // alert("end of quiz");
    }

    // console.log(currentQuestion);
  }

  return (
    <div className="quiz">
      {props.quizQuestions.length !== 0 ? (
        <>
          <div className="quizTitleContainer">
            <h2>Time for that <span>Nerd Flag to Fly</span></h2>
            <p className="playerCurrentScore">Your Current Score is <span>{currentScore}</span></p>
          </div>
          <div className="quizContainer">
            <p className="currentQuestion">Question: {(props.quizQuestions[currentQuestion].question).replace(/&quot;/g, '"').replace(/&rsquo;/g, "'").replace(/&Eacute;/g, "é").replace(/&#039;/g, "'").replace(/&shy;/g, "")}
            </p>

            <div className="answerContainer">
            {props.quizQuestions[currentQuestion].answerButtons.map(
              (answerItem, index) => {
                return (
                  <button
                    value={answerItem.name}
                    onClick={handleAnswerClick}
                    key={index}
                    className={
                      answerItem.isCorrect ? "correctAnswer" : "incorrectAnswer"
                    }
                  >
                    {(answerItem.name).replace(/&quot;/g, '"').replace(/&rsquo;/g, "'").replace(/&Eacute;/g, "é").replace(/&#039;/g, "'").replace(/&shy;/g, "")}
                  </button>
                );
              }
            )}
            </div>

            

          </div>

        </>
      ) : null}
      {scoreboard ? <Scoreboard currentScore={currentScore} trigger={popup} setTrigger={setPopup} /> : null}
    </div>
  );
}

export default Quiz;



// props.quizQuestions[currentQuestion].incorrect_answers
// {style it red} on button click
// props.quizQuestions[currentQuestion].correct_answer
// {style it green} on button click