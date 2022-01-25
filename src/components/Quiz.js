
const Quiz = (props) => {

  const handleAnswerClick = (event) => {
    const userAnswer = event.target.value;
    if (userAnswer === props.quizQuestions[2].correct_answer){
      console.log("Correct!")
    }else{
      console.log("Nope!")
    }
  }

    return (
      <div>
        {props.quizQuestions.length !== 0  ?
          <>
            <h2>quiz here</h2>
            
            <p>Question: {props.quizQuestions[2].question}</p>
            {
              props.quizQuestions[2].allAnswers.map((answerItem, index)=>{
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

