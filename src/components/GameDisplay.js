import { useState } from "react";
import ReactModal from "react-modal";
import { Navigate } from 'react-router-dom';
import PlayerDisplay from "./PlayerDisplay.js";
const Quiz = (props) => {
  // quizQuestions, updatePlayerInfo, playerInfo
  const { quizQuestions, updatePlayerInfo, appPlayerInfo } = props;
 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [turnPlayer, setTurnPlayer] = useState(0);
  const [showScoreBoard, setShowScoreBoard] = useState(false);

  const checkAnswer = (event) => {
    const userAnswer = event.target.value;

    // local variable of appPlayerInfo
    const allPlayerInfo = appPlayerInfo;

    // access player's turn - based on turnPlayer state
      // access current player info
    const currentPlayerInfo = allPlayerInfo[turnPlayer];

    updatePlayerInfo(allPlayerInfo);
    if (currentIndex < quizQuestions.length - 1) {
      if (userAnswer === quizQuestions[currentIndex].correct_answer) {
        currentPlayerInfo.score = currentPlayerInfo.score + 10;
        allPlayerInfo[turnPlayer] = currentPlayerInfo;
        updatePlayerInfo(allPlayerInfo);
      } 
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowScoreBoard(true);
     }

     if (appPlayerInfo.length === (turnPlayer + 1)) {
      setTurnPlayer(0);
    } else {
      setTurnPlayer(turnPlayer + 1);
    }
     allPlayerInfo[turnPlayer] = currentPlayerInfo;
  }

  return (
    <div className="wrapper">
      <PlayerDisplay playerInfo={appPlayerInfo}/>
      <h2>It's player {appPlayerInfo[turnPlayer].name}'s turn</h2>
      <div className="quiz">
      {quizQuestions.length !== 0 && (
      <>
        <div className="quizContainer">
          <div className="questionContainer">
            <p>Question {currentIndex + 1}</p>
            <h2 className="currentQuestion">{(quizQuestions[currentIndex].question)}</h2>
          </div>
          <div className="answerContainer">
            {quizQuestions[currentIndex].answerButtons.map((answerItem, index) => {
                return (
                  <button
                    value={answerItem.name}
                    onClick={checkAnswer}
                    key={index}
                    className={answerItem.isCorrect ? "correctAnswer" : "incorrectAnswer"}
                  >{(answerItem.name).replace(/&quot;/g, '"').replace(/&ntilde;/g, "ñ").replace(/&eacute;/g, "é").replace(/&rsquo;/g, "'").replace(/&amp;/g, "&").replace(/&Eacute;/g, "é").replace(/&#039;/g, "'").replace(/&shy;/g, "").replace(/&iacute;/g, "í").replace(/&oacute;/g, "Ó").replace(/&reg;/g, "®").replace(/&trade;/g, "™").replace(/&lt;/g, "<")}
                  </button>
                );
              }
            )}
          </div>   
        </div>
      </>)}

      <div className="quizRouterBtn">
          {showScoreBoard && <Navigate replace to="/scoreboard" />}
      </div>
    </div>
  </div>
  );
}

export default Quiz;