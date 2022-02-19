import { useState } from "react";
import ReactModal from "react-modal";
import Scoreboard from "./Scoreboard.js";

const Quiz = (props) => {
  const { allPlayersArr } = props;
 
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [showScoreModal, setShowScoreModal] = useState(false);

  const handleOpenScoreModal = () => {
    setShowScoreModal(true);
  }

  const handleCloseScoreModal = () => {
    setShowScoreModal(false);
  }

  const handleAnswerClick = (event) => {
    const userAnswer = event.target.value;
    if (userAnswer === props.quizQuestions[currentQuestion].correct_answer) {
      setCurrentScore(currentScore + 10);
    } 
    if (currentQuestion < props.quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleOpenScoreModal();
      addScoreToObj(currentScore);
     }
  }

  const addScoreToObj = (score) => {
    let tempAllPlayersArr = [...allPlayersArr];
    tempAllPlayersArr[0] = {
      ...tempAllPlayersArr[0],
      score: score
    }
    props.updatePlayerArr(tempAllPlayersArr);
  }

  return (
    <div className="quiz wrapper">
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
      
      <ReactModal isOpen={showScoreModal} onRequestClose={handleCloseScoreModal} className={"popupInner"}style={{overlay: {background: "rgba(0, 0, 0, 0.2)"}}} appElement={document.getElementsByClassName('app')}>
        <Scoreboard currentScore={currentScore} allPlayersArr={allPlayersArr}/>
      </ReactModal>

    </div>
  );
}

export default Quiz;