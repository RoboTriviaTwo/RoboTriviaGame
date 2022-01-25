import { useState } from "react";


const Quiz = (props) => {

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswerClick = (event) => {
    const userAnswer = event.target.value;
    if (userAnswer === props.quizQuestions[currentQuestion].correct_answer){
      console.log("Correct!")
    }else{
      console.log("Nope!")
    }
    if (currentQuestion < props.quizQuestions.length - 1 ){
      setCurrentQuestion(currentQuestion + 1)
      console.log(currentQuestion);
    } 
    else {
      alert("end of quiz");
    }
    // console.log(currentQuestion);
  }

    return (
      <div>
        {props.quizQuestions.length !== 0  ?
          <>
            <h2>quiz here</h2>
            
            <p>Question: {props.quizQuestions[currentQuestion].question}</p>
            {
              props.quizQuestions[currentQuestion].incorrect_answers.map((answerItem, index)=>{
                return(
                  <button
                    value={answerItem}
                    onClick={handleAnswerClick}
                    key={index}>{answerItem}
                  </button>
                )
              })
            }
           
            
          </>
        :
        null}
      </div>
    );
}

export default Quiz;

