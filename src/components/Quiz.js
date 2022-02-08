import { useState } from "react";
import Scoreboard from "./Scoreboard.js";

const Quiz = (props) => {
  // useState to track question numbers
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // useState to track score
  const [currentScore, setCurrentScore] = useState(0);
  // useState to show score
  const [scoreboard, setScoreboard] = useState(false);
  // useState to set the popup of quiz done
  const [popup, setPopup] = useState(false);
  // handleClick to update score, advance question and show score at the end of the game
  const handleAnswerClick = (event) => {
    const userAnswer = event.target.value;
    if (userAnswer === props.quizQuestions[currentQuestion].correct_answer) {
      setCurrentScore(currentScore + 10);
    } 
    if (currentQuestion < props.quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setScoreboard(true);
      setPopup(true);
      props.scoreSetter(currentScore);
     }
  }

  return (
    <div className="quiz">
      {/* if the set of questions is not zero */}
      {props.quizQuestions.length !== 0 ? (
      <>
        <div className="quizTitleContainer">
          <p className="playerCurrentScore">Current Score <span>{currentScore}</span></p>
        </div>

        <div className="quizContainer">
          <p className="currentQuestion">Question: {(props.quizQuestions[currentQuestion].question).replace(/&quot;/g, '"').replace(/&rsquo;/g, "'").replace(/&Eacute;/g, "é").replace(/&#039;/g, "'").replace(/&shy;/g, "")}</p>

          <div className="answerContainer">
            {props.quizQuestions[currentQuestion].answerButtons.map((answerItem, index) => {
                return (
                  <button
                    value={answerItem.name}
                    onClick={handleAnswerClick}
                    key={index}
                    className={answerItem.isCorrect ? "correctAnswer" : "incorrectAnswer"}
                  >{(answerItem.name).replace(/&quot;/g, '"').replace(/&rsquo;/g, "'").replace(/&Eacute;/g, "é").replace(/&#039;/g, "'").replace(/&shy;/g, "")}
                  </button>
                );
              }
            )}
          </div>   
        </div>
      </>) : null}

      {scoreboard ? <Scoreboard 
      currentScore={currentScore} 
      trigger={popup} 
      setTrigger={setPopup}
      allPlayersArr={props.allPlayersArr}/> : null}
    </div>
  );
}

export default Quiz;